package com.esprit.pi_project.authentification;

import com.esprit.pi_project.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Date Registration;
    private Date lastLogin;
    private String Identifiant;
    private String passwordHint;
    private Role role;
    private boolean FirstLogin;
    private boolean accountNonLocked;


    public Date setRegistration() {
        this.Registration = new Date();
        return this.Registration;
    }

    public Date setLastLogin() {
        this.lastLogin = new Date();
        return this.lastLogin;
    }
}
