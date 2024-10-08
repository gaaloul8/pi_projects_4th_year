package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Comment;
import com.esprit.pi_project.entities.User;
import org.springframework.http.ResponseEntity;

import java.text.ParseException;
import java.util.List;

public interface CommentService {
    Comment addComment(Comment comment, Long idPost, User user) throws ParseException;
    Comment updateComment(Comment comment);

    void deleteComment(Long idComment);
    Comment findCommentById(Long idComment);
    List<Comment> findAllComments();
    List<Comment> findbyPost(Long postId);

}
