package com.esprit.pi_project.controllers;

import com.esprit.pi_project.authentification.AuthResponse;
import com.esprit.pi_project.authentification.ForgetPasswordRequest;
import com.esprit.pi_project.authentification.SignInRequest;
import com.esprit.pi_project.authentification.SignupRequest;
import com.esprit.pi_project.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

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

    @PostMapping("/refersh")
    public void refresh(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        Service.refreshToken(request, response);
    }

    @PostMapping("/forget-password")
    public ResponseEntity<String> forgetPassword(@RequestBody ForgetPasswordRequest request) {
        Service.forgetPw(request.getEmail());
        return ResponseEntity.ok("Password reset email sent successfully.");
    }
    @PostMapping("/reset-password/{resetToken}")
    public ResponseEntity<String> resetPassword(@PathParam("resetToken") String resetToken, @RequestBody String newPassword) {
        try {
            System.out.println(resetToken);
            Service.ResetPw(newPassword, resetToken);
            return ResponseEntity.ok("Password reset successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to reset password. Error: " + e.getMessage());
        }
    }

}
