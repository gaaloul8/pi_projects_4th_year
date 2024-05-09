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
    private int rating;

    @ManyToOne
    @JoinColumn(name = "id_user")
   // @JsonManagedReference
    private User User;

    @Override
    public String toString() {
        return "Reward{" +
                "idReward=" + idReward +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", cost=" + cost +
                ", nbDispo=" + nbDispo +
                ", image='" + image + '\'' +
                ", user=" + (User != null ? User.getId_user() : null) + // Assuming getIdUser() returns the user's ID
                '}';
    }

    //@OneToOne(mappedBy = "reward")
    //private Discount discount;
}
