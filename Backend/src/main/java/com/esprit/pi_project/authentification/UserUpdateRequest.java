package com.esprit.pi_project.authentification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequest {
    private String firstName;
    private String lastName;
    private String password;
    private MultipartFile profilePicture;

}