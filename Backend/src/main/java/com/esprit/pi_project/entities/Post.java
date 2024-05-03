package com.esprit.pi_project.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Blob;
import java.util.Date;
import java.util.List;
@Entity
@Data
@Table(name = "post")
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Post implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    @Lob
    @Column(nullable = true, length = 10000000)
    private String image;
    private Date postDate;
    private String content;


    @OneToMany(mappedBy = "post" ,cascade = CascadeType.ALL)

    private List<Comment> comments;

}
