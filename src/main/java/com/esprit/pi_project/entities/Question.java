package com.esprit.pi_project.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Question implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer questionId;

    private String title;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User author;

    @Temporal(TemporalType.DATE)
    private Date createdAt;

    private String content;

    private Integer upvotes;

    private Boolean closed;

    @OneToMany(mappedBy = "question")
    private List<Response> responses = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "forumId")
    private Forum forum;

}
