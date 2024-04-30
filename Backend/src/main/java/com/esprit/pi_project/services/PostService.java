package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Comment;
import com.esprit.pi_project.entities.Post;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.List;

public interface PostService {
    Post addPost(Post post);
    Post updatePost(Post post);

    void deletePost(Long idPost);
    Post findPostById(Long idPost);
    List<Post> findAllPost();
    List<Post> findByPostDate(Date postDate);
}
