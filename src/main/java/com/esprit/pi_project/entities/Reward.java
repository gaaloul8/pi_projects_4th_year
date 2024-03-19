package com.esprit.pi_project.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
@Entity
@Table(name="Reward")
@Data
public class Reward implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idReward;
    private String name;
    private String description;
    private float cost;
    @ManyToOne
    @JoinColumn(name = "id_user")
    private User User;

    @OneToOne
    private Discount discount;
}
