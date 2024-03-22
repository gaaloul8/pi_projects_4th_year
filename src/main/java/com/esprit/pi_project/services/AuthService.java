package com.esprit.pi_project.services;

import com.esprit.pi_project.authentification.SignInRequest;
import com.esprit.pi_project.dao.UserDao;
import com.esprit.pi_project.authentification.AuthResponse;
import com.esprit.pi_project.authentification.SignupRequest;
import com.esprit.pi_project.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


public interface AuthService {
    AuthResponse Register (SignupRequest newuser);
    AuthResponse login (SignInRequest user);

}
