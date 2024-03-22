package com.esprit.pi_project.service;

import com.esprit.pi_project.entities.Comment;
import com.esprit.pi_project.entities.Post;

import java.util.List;

public interface PostService {
    Post addPost(Post post);
    Post updatePost(Post post);

    void deletePost(Long idPost);
    Post findPostById(Long idPost);
    List<Post> findAllPost();
}
