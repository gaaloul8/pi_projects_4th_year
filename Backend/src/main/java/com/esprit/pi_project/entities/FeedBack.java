package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name="feedback")
@Getter
@Setter
public class FeedBack implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFeedback;

    private String content;
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusFeedback status;

    private int rating;

    @ManyToOne
    @JoinColumn(name = "idEvent")
    Evenement evenement;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User User;
}
