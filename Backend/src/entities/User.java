package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.*;

@Entity
@Getter
@Setter

public class User implements Serializable {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        private String firstName;

        private String lastName;

        private String email;

        private String password;

        @Column
        @Temporal(TemporalType.DATE)
        private Date registrationDate;

        @Column
        @Temporal(TemporalType.TIMESTAMP)
        private Date lastLogin;

        private String status;

        private String role;

        // Relation to Reclamation (One user can submit many reclamations)
        @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL)
        @JsonManagedReference
        private List<Reclamation> reclamations = new ArrayList<>();

    }
