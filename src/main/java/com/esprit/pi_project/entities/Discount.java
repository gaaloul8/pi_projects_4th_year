package com.esprit.pi_project.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="Discount")
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
    
    @OneToOne
    private Reward reward;

}
