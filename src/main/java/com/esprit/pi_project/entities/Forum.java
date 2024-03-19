package com.esprit.pi_project.entities;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
public class Forum implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer forumId;

    private String topic;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User ForumOwner;

    @Temporal(TemporalType.DATE)
    private Date createdAt;

    private String content;

    private Integer likes;

    private Boolean closed;

    @OneToMany(mappedBy = "forum")
    private List<Question> questions = new ArrayList<>();

}
