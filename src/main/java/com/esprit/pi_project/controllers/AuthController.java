package com.esprit.pi_project.controllers;

import com.esprit.pi_project.authentification.AuthResponse;
import com.esprit.pi_project.authentification.SignInRequest;
import com.esprit.pi_project.authentification.SignupRequest;
import com.esprit.pi_project.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired

    private final  AuthService Service;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> Register(
            @RequestBody SignupRequest request
    ) {
        return ResponseEntity.ok(Service.Register(request));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> Signin(
            @RequestBody SignInRequest request
    ) {
        return ResponseEntity.ok(Service.login(request));

    }
}
