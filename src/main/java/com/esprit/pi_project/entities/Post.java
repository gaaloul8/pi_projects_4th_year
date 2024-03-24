package com.esprit.pi_project.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
@Entity
@Data
@Table(name = "post")

public class Post implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    private String image;
    private Date postDate;
    private String content;


    @OneToMany(mappedBy = "post" ,cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Comment> comments;

}
