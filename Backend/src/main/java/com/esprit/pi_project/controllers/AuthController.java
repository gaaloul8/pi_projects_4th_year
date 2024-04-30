
package com.esprit.pi_project.controllers;

import com.esprit.pi_project.authentification.*;
import com.esprit.pi_project.dao.UserDao;
import com.esprit.pi_project.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
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
    @PostMapping("/carte")
    public AuthResponse register(@RequestParam("carte") MultipartFile file) throws IOException {
        // Register the user based on the signature image
        return Service.register(file);
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
    public ResponseEntity<String> resetPassword(@PathVariable("resetToken") String resetToken, @RequestBody ResetRequest resetRequest) {
        try {
            String password = resetRequest.getPassword();
            Service.ResetPw(password, resetToken);
            return ResponseEntity.ok("Password reset successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to reset password. Error: " + e.getMessage());
        }
    }

}

