package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.util.List;
@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Club implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long clubId;
    @Size(min = 1, max = 20)
    @NotBlank(message = "ClubName cannot be blank")
    private String clubName;
    //private User manager;
    @Size(min = 1,max = 150)
    private String description;
    @NotBlank(message = "You need to have club members ")
    private Integer membershipCount;
    @Enumerated(EnumType.STRING)
    private Tag tag;


}