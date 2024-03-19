package com.esprit.pi_project.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "QuizUsers")
public class QuizUser implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idQuizUser;

    private String score;
    private String description;

    @Temporal(TemporalType.DATE)
    private Date participationDate;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User QuizUser;

    @ManyToOne
    private  Quiz quiz;

}
