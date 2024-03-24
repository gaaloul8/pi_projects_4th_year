package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reclamation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reclamationId;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReclamationStatus status;

    @ManyToOne
    @JoinColumn(name = "created_by_user_id", nullable = false)
    @JsonBackReference
    private User createdBy;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    @Column(name = "is_archived", nullable = false)
    private boolean isArchived = false;

}
