package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "comment")

public class Comment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    private Date date;

    private String content;

    @ManyToOne
    @JsonIgnore
    private Post post;

    @ManyToOne
    private User user;
}
