package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "QuizUsers")
@Transactional
public class QuizUser implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idQuizUser;

    private String score;
    @Column(length = 1000)
    private String description;
    @Transient
    private List<String> reponses;

    @Temporal(TemporalType.DATE)
    private Date participationDate;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_user")
    private User QuizUser;

    @JsonIgnore
    @ManyToOne
    private  Quiz quiz;

}
