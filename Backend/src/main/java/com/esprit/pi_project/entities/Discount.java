package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "Discount")
@Data
public class Discount implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDiscount;

    @Temporal(TemporalType.DATE)
    private Date createdDiscount;

    @Temporal(TemporalType.DATE)
    private Date endDiscount;

    private String discountValue;

    @OneToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties(value="reward", allowSetters = true)
    private Reward reward;

    // Constructors, getters, setters, and othxer methods
}
