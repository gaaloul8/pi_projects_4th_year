
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
    @ManyToOne(cascade = CascadeType.ALL)
    private Quiz quiz;

    @OneToMany (mappedBy = "question",fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    private List<QuizOption> options;



}
