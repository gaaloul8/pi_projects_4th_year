package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name="QuQuestions")
@Data
public class QuizQuestion implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idQuestion;

    private String content;
    @JsonIgnore
    @ManyToOne
    private Quiz quiz;

    @OneToMany (mappedBy = "question",cascade = CascadeType.ALL)
    private List<QuizOption> options;



}
