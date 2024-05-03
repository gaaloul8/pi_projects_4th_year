package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Comment;
import com.esprit.pi_project.entities.Post;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface PostService {
    //Post addPost(Post post, MultipartFile imageFile);
    Post addPost(String content, MultipartFile imageFile) throws IOException, ParseException;
    Post updatePost(Post post);

    void deletePost(Long idPost);
    Post findPostById(Long idPost);
    List<Post> findAllPost();
    List<Post> findByPostDate(Date postDate);
    Map<Integer, Long> countTransactionsByMonth();
    Post updatePost(Long postId,  String content, MultipartFile image) throws IOException;
}
