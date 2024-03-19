package com.esprit.pi_project.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name="options")
@Data
public class QuizOption implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idOption;
    private String content;
    private Boolean correct;

    @ManyToOne
    QuizQuestion question;
}
