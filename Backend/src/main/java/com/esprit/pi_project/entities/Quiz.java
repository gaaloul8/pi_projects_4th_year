package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name="Quizs")
@Data
@Transactional
public class Quiz implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idQuiz;

    private String title;
    private String type;

    private String description ;
    private boolean publication;


    @ManyToOne
    @JoinColumn(name = "id_user")
    private User QuizOwner;

    @OneToMany(mappedBy = "quiz",cascade = CascadeType.ALL)
    private List< QuizUser> quizUsers;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL)
    private List<Activity> activities;

    @OneToMany(mappedBy = "quiz" ,cascade = CascadeType.ALL)
    private List<QuizQuestion> questions;




}
