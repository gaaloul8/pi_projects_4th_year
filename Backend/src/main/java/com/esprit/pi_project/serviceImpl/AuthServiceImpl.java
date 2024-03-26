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
import com.esprit.pi_project.services.jwtService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final jwtService jwtService;
    private final UserDao userDao;
    private final TokenDao tokenDao;
    private final PasswordEncoder passwordEncoder;
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
        RevokeTokens(user);
        saveUserToken(user, jwtToken);




        return AuthResponse.builder()
        .jwtaccestoken(jwtToken)
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
        RevokeTokens(user);
        saveUserToken(user, jwtToken);



        return AuthResponse.builder()
                .jwtaccestoken(jwtToken)
                .build();
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
