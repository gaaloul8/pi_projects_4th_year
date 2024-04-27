package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

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
    private Integer nbDispo;
    @Column(length = 200000000)
    @Lob
    private String image;

    @ManyToOne
    @JoinColumn(name = "id_user")
    //@JsonManagedReference
    private User User;


    //@OneToOne(mappedBy = "reward")
    //private Discount discount;
}
