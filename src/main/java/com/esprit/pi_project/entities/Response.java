package com.esprit.pi_project.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@Entity
public class Response implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer responseId;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User author;

    @Temporal(TemporalType.DATE)
    private Date createdAt;

    private String content;

    private Boolean accepted;

    private Boolean reported;

    private Integer upvotes;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

}
