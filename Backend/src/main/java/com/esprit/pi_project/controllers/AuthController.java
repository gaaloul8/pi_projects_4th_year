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
import java.util.HashMap;
import java.util.Map;

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
    public ResponseEntity<Object> forgetPassword(@RequestBody ForgetPasswordRequest request) {
        Map<String, String> response = new HashMap<>();
        response.put("message",""+ "Password reset email sent successfully.");

        Service.forgetPw(request.getEmail());
        return ResponseEntity.ok(response);


    }
    @PostMapping("/reset-password/{resetToken}")
    public ResponseEntity<Object> resetPassword(@PathVariable("resetToken") String resetToken, @RequestBody ResetRequest resetRequest) {
        Map<String, String> response = new HashMap<>();
        try {
            response.put("message",""+ "Password reset successfully..");
            String password = resetRequest.getPassword();
            Service.ResetPw(password, resetToken);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message",""+ "Failed To reset password");
            System.out.println(e);
            return ResponseEntity.badRequest().body(response + e.getMessage());
        }
    }

}
