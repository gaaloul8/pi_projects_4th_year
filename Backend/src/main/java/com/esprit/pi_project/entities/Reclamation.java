package com.esprit.pi_project.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
@Data
@Entity
public class Reclamation implements Serializable {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private int reclamationId;
    @Column(
            nullable = false,
            length = 100
    )
    private String title;
    @Column(
            nullable = false,
            length = 500
    )
    private String description;
    @Enumerated(EnumType.STRING)
    @Column(
            nullable = false
    )
    private ReclamationStatus status;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User createdBy;

    @Column(
            nullable = false
    )
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

}