
package com.esprit.pi_project.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import jakarta.validation.constraints.NotBlank;


@Data
@Entity
public class Question implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer questionId;

    @NotBlank(message = "Title is required")
    private String title;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User author;

    @Temporal(TemporalType.DATE)
    private Date createdAt;

    @NotBlank(message = "Content is required")
    private String content;

    private Integer upvotes;

    private Boolean closed;

//    @OneToMany(mappedBy = "question")
//    private List<Response> responses = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "forumId")
    private Forum forum;

}
