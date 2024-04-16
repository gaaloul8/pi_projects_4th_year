package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToOne
    @JoinColumn(name = "idEvent")
    @JsonIgnore
    Evenement evenement;

    @ManyToOne
    @JoinColumn(name = "id_user")
    @JsonIgnore
    private User User;
}
