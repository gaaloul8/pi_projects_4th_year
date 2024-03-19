package com.esprit.pi_project.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name="Quizs")
@Data

public class Quiz implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idQuiz;

    private String title;
    private String type;

    private String description ;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User QuizOwner;

    @OneToMany(mappedBy = "quiz")
    private List< QuizUser> quizUsers;

    @OneToMany(mappedBy = "quiz")
    private List<Activity> activities;

    @OneToMany(mappedBy = "quiz")
    private List<QuizQuestion> questions;




}
