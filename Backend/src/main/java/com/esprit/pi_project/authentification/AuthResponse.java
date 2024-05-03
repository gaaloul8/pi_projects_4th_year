package com.esprit.pi_project.authentification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String jwtaccestoken;
    private String jwtRefreshtoken;
    private Boolean FirstLogin;
    private  Integer failedLoginAttempts;
    private  boolean isUserLocked;
    private LocalDateTime lockTime;
    private String Role;
}
