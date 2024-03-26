package com.esprit.pi_project.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Entity
@Data
public class TransactionHistory implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "reward_id")
    private Reward reward;

    @Temporal(TemporalType.TIMESTAMP)
    private Date purchaseDate;


    private float price;
}
