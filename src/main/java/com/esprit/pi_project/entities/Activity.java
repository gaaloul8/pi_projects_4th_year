package com.esprit.pi_project.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name="Activities")
@Data
public class Activity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idActivity;
    private String title;
    private String content;
    private String type;

    @ManyToOne
    private  Quiz quiz;



}
