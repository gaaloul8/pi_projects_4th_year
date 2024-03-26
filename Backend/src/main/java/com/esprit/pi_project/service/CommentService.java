package com.esprit.pi_project.service;

import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Comment;

import java.util.List;

public interface CommentService {
    Comment addComment(Comment comment);
    Comment updateComment(Comment comment);

    void deleteComment(Long idComment);
    Comment findClubById(Long idComment);
    List<Comment> findAllComment();
}
