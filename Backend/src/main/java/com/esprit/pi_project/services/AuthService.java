package com.esprit.pi_project.services;

import com.esprit.pi_project.authentification.SignInRequest;
import com.esprit.pi_project.authentification.AuthResponse;
import com.esprit.pi_project.authentification.SignupRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;


public interface AuthService {
    AuthResponse Register (SignupRequest newuser);
    AuthResponse login (SignInRequest user);

    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
    public void forgetPw(String email);
    public void ResetPw(String password, String ResetToken);
}
