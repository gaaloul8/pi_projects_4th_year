package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Comment;
import com.esprit.pi_project.entities.Post;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

public interface PostService {
    Post addPost(Post post, MultipartFile imageFile);
    Post updatePost(Post post);

    void deletePost(Long idPost);
    Post findPostById(Long idPost);
    List<Post> findAllPost();
    List<Post> findByPostDate(Date postDate);
}
