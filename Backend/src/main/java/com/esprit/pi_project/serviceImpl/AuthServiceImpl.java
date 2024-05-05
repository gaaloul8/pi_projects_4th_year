package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.authentification.AuthResponse;
import com.esprit.pi_project.authentification.SignInRequest;
import com.esprit.pi_project.authentification.SignupRequest;
import com.esprit.pi_project.dao.TokenDao;
import com.esprit.pi_project.dao.UserDao;
import com.esprit.pi_project.entities.Role;
import com.esprit.pi_project.entities.Token;
import com.esprit.pi_project.entities.TokenT;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.AuthService;
import com.esprit.pi_project.services.EmailSender;
import com.esprit.pi_project.services.TesseractOCRService;
import com.esprit.pi_project.services.jwtService;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final jwtService jwtService;
    private final UserDao userDao;
    private final TokenDao tokenDao;
    private final PasswordEncoder passwordEncoder;
    private final EmailSender emailSender;
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


    @Autowired
    private TesseractOCRService tesseractOCRService;


    private  final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse Register(SignupRequest newuser) {
        String rawPassword = newuser.getPassword();
        String passwordHint = rawPassword.substring(0, Math.min(rawPassword.length(), 3)); // Extract first three letters
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@esprit\\.tn$";
        if (!newuser.getEmail().matches(emailRegex)) {
            throw new IllegalArgumentException("Invalid email format or domain.");
        }

        if (userDao.findByEmail(newuser.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User with this email already exists.");
        }
        String nameRegex = "^[a-zA-Z ]+$";
        if (!newuser.getFirstName().matches(nameRegex) || !newuser.getLastName().matches(nameRegex)) {
            throw new IllegalArgumentException("First name and last name should only contain alphabets and spaces.");
        }

        var user= User.builder()
                .firstName(newuser.getFirstName())
                .lastName(newuser.getLastName())
                .email(newuser.getEmail())
                .passwordHint(passwordHint)
                .password(passwordEncoder.encode(newuser.getPassword()))
                .registrationDate(newuser.setRegistration())
                .lastLogin(newuser.setLastLogin())
                .role(Role.User)
                .FirstLogin(true)
                .accountNonLocked(true)
                .Identifiant(newuser.getIdentifiant())
                .build();


//        System.out.println("Before printing firstName");
//        System.out.println(newuser.getEmail());
//        System.out.println(newuser.getLastName());
//        System.out.println(newuser.getPassword());
//
//
//        System.out.println("After printing firstName");
        var currUser=  userDao.save(user);
        var jwtToken= jwtService.issueToken(currUser);
        var refreshToken = jwtService.issueRefreshToken(user);
        RevokeTokens(user);
        saveUserToken(user, jwtToken);




        return AuthResponse.builder()
                .jwtaccestoken(jwtToken)
                .jwtRefreshtoken(refreshToken)

                .build();
    }

    @Override
    public AuthResponse login(SignInRequest user1) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user1.getEmail(),
                            user1.getPassword()
                    )
            );

            var user = userDao.findByEmail(user1.getEmail())
                    .orElseThrow();

            var jwtToken = jwtService.issueToken(user);
            var refreshToken = jwtService.issueRefreshToken(user);
            var firstLogin = user.isFirstLogin();
            var failedloginAttempts =user.getFailedLoginAttempts();
            var Rolee= user.getRole();
            var isUserLocked= user.isAccountNonLocked();
            var LockTime= user.getLockTime();
            user.setAccountNonLocked(true);
            System.out.println(Rolee);
            userDao.save(user);
            user.setFailedLoginAttempts(0);
            RevokeTokens(user);
            saveUserToken(user, jwtToken);
            System.out.println(user.isAccountNonLocked());
            return AuthResponse.builder()
                    .jwtaccestoken(jwtToken)
                    .jwtRefreshtoken(refreshToken)
                    .FirstLogin(firstLogin)
                    .failedLoginAttempts(failedloginAttempts)
                    .isUserLocked(isUserLocked)
                    .Role(String.valueOf(Rolee))
                    .build();
        } catch (AuthenticationException e) {
            System.out.println(user1.getEmail());
            var user = userDao.findByEmail(user1.getEmail())
                    .orElseThrow();
            user.setFailedLoginAttempts(user.getFailedLoginAttempts()+1);
            userDao.save(user);
            System.out.print(e);
            throw new BadCredentialsException("Invalid email or password");
        }
    }

    @Override
    public AuthResponse register( MultipartFile file) throws IOException {
        String extractedText = tesseractOCRService.recognizeText(file.getInputStream());
        TesseractOCRService.ExtractedData extractedData = tesseractOCRService.extractData(extractedText);
        User newUser = new User();
        newUser.setLastName(extractedData.getNom());
        newUser.setFirstName(extractedData.getPrenom());
        newUser.setRole(Role.User);
        String email = extractedData.getNom().toLowerCase() + "." + extractedData.getPrenom().toLowerCase() + "@esprit.tn";
        newUser.setEmail(email);
        String password = generateRandomPassword();
        String recipientEmail = email;
        String subject = "Claim password";
        String content = "Your password is :\n" + password;
        try {
            emailSender.sendEmail(recipientEmail, subject, content);
            System.out.println("Email sent successfully.");
        } catch (MessagingException | UnsupportedEncodingException e) {
            System.out.println("Failed to send email. Error: " + e.getMessage());
        }
        newUser.setPassword(passwordEncoder.encode(password));
        var currUser=  userDao.save(newUser);
        var jwtToken= jwtService.issueToken(currUser);
        var refreshToken = jwtService.issueRefreshToken(newUser);
        RevokeTokens(newUser);
        saveUserToken(newUser, jwtToken);




        return AuthResponse.builder()
                .jwtaccestoken(jwtToken)
                .jwtRefreshtoken(refreshToken)

                .build();
    }
    public static String generateRandomPassword() {
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            password.append(CHARACTERS.charAt(randomIndex));
        }
        return password.toString();
    }
    @Override
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String Email;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        Email = jwtService.extractemail(refreshToken);
        if (Email != null) {
            var user = this.userDao.findByEmail(Email)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.issueToken(user);
                RevokeTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthResponse.builder()
                        .jwtaccestoken(accessToken)
                        .jwtRefreshtoken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }}

    public static String generateRandomToken() {
        return UUID.randomUUID().toString();
    }

    @Override
    public void forgetPw(String email) {
        Optional<User> userOptional = userDao.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String resetToken = generateRandomToken();
            System.out.println(resetToken);
            user.setResetToken(resetToken);
            userDao.save(user);
            String resetUrl = "http://localhost:4200/auth/reset-password/" + resetToken;
            String recipientEmail = user.getEmail();
            String subject = "Password Reset";
            String content = "Reset urlSent:\n" + resetUrl;
            try {
                emailSender.sendEmail(recipientEmail, subject, content);
                System.out.println("Email sent successfully.");
            } catch (MessagingException | UnsupportedEncodingException e) {
                System.out.println("Failed to send email. Error: " + e.getMessage());
            }
        } else {
            throw new IllegalArgumentException(" dosn'texists.");



        }
    }

    @Override
    public void ResetPw(String password, String resetToken) {

        Optional<User> userOptional = userDao.findByResetToken(resetToken);
        // System.out.println(userOptional);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(passwordEncoder.encode(password));
            userDao.save(user);
        } else {
            System.out.println("user not found");

        }
    }


    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenT.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenDao.save(token);
    }
    private void RevokeTokens(User user) {
        var userId=user.getId_user();
        var validtokens = tokenDao.findtokens(userId);
        if (validtokens.isEmpty())
            return;
        validtokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
        });
        tokenDao.saveAll(validtokens);
    }





}