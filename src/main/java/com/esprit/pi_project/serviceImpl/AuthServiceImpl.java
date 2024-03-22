package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.authentification.AuthResponse;
import com.esprit.pi_project.authentification.SignInRequest;
import com.esprit.pi_project.authentification.SignupRequest;
import com.esprit.pi_project.dao.UserDao;
import com.esprit.pi_project.entities.Role;
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
    private final PasswordEncoder passwordEncoder;
    private  final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse Register(SignupRequest newuser) {
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
      userDao.save(user);
      var jwtToken= jwtService.issueToken(user);

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

        return AuthResponse.builder()
                .jwtaccestoken(jwtToken)
                .build();
    }
}
