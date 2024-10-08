package com.esprit.pi_project.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name="options")
@Data
@Transactional
public class QuizOption implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idOption;
    private String content;
    private Boolean correct;

    @JsonIgnore
    @ManyToOne()
    QuizQuestion question;
}
