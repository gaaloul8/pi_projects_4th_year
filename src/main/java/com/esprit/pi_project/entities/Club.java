package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
@Entity
@Data
public class Club implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long clubId;
    private String clubName;
    private String clubCategory;
    //private User manager;
    private String description;
    private Integer membershipCount;
    @Enumerated(EnumType.STRING)
    private Tag tag;
    @OneToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Post> posts;


}
