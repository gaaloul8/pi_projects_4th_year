package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name="QuQuestions")
@Data
@Transactional
public class QuizQuestion implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idQuestion;

    private String content;
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    private Quiz quiz;

    @OneToMany (mappedBy = "question",cascade = CascadeType.ALL)
    private List<QuizOption> options;



}
