package com.esprit.pi_project.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name="reservation")
@Getter
@Setter
public class Reservation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idR;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User User;

    @ManyToOne
    @JoinColumn(name = "idEvent")
    Evenement evenementR;
}
