package com.esprit.pi_project.entities;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Entity
public class Forum implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer forumId;

    @NotBlank(message = "Topic is required")
    private String topic;

    @ManyToOne
    @JoinColumn(name = "id_user")
   // @JsonManagedReference
    private User ForumOwner;

    @Temporal(TemporalType.DATE)
    private Date createdAt;

    @NotBlank(message = "Content is required")
    private String content;

    private Integer likes;

    private Boolean closed;

    @OneToMany(mappedBy = "forum")
    private List<Question> questions = new ArrayList<>();

}
