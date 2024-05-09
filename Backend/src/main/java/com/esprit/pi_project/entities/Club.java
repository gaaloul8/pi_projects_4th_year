package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import jakarta.validation.constraints.Size;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
@Entity
@Data
public class Club implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long clubId;
    @Size(min = 1, max = 20)
    //@NotBlank(message = "ClubName cannot be blank")
    private String clubName;


    private String description;
    @Lob
    @Column(nullable = true, length = 10000000)
    private String image;

    private Integer membershipCount;
    @Enumerated(EnumType.STRING)
    private Tag tag;
    @JsonManagedReference
    @OneToOne
    private User user;


}