package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.authentification.AuthResponse;
import com.esprit.pi_project.authentification.SignInRequest;
import com.esprit.pi_project.authentification.SignupRequest;
import com.esprit.pi_project.dao.TokenDao;
import com.esprit.pi_project.dao.UserDao;
import com.esprit.pi_project.entities.Token;
import com.esprit.pi_project.entities.TokenT;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.AuthService;
import com.esprit.pi_project.services.EmailSender;
import com.esprit.pi_project.services.jwtService;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
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



    private  final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse Register(SignupRequest newuser) {
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
              .password(passwordEncoder.encode(newuser.getPassword()))
              .registrationDate(newuser.setRegistration())
              .lastLogin(newuser.setLastLogin())
              .role(newuser.getRole())
              .build();

        System.out.println("Before printing firstName");
        System.out.println(newuser.getEmail());
        System.out.println(newuser.getLastName());

        System.out.println("After printing firstName");
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
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user1.getEmail(),
                        user1.getPassword()
                )
        );

        var user=userDao.findByEmail(user1.getEmail())
                .orElseThrow();
        System.out.print(user);
        System.out.println(user.getEmail());
        var jwtToken= jwtService.issueToken(user);
        var refreshToken = jwtService.issueRefreshToken(user);

        RevokeTokens(user);
        saveUserToken(user, jwtToken);



        return AuthResponse.builder()
                .jwtaccestoken(jwtToken)
                .jwtRefreshtoken(refreshToken)
                .build();
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
            String resetUrl = "http://localhost:8081/auth/reset-password/" + resetToken;
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
            System.out.println("dosnt exists");        }
    }

    @Override
    public void ResetPw(String newpassword, String resetToken) {

        Optional<User> userOptional = userDao.findByResetToken(resetToken);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(newpassword);
        } else {
            System.out.println(" Url invalid");
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
