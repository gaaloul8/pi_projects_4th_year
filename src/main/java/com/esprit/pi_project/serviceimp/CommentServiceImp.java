package com.esprit.pi_project.serviceimp;

import com.esprit.pi_project.dao.CommentDao;
import com.esprit.pi_project.entities.Comment;
import com.esprit.pi_project.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class CommentServiceImp implements CommentService {
    @Autowired
    private CommentDao commentDao;
    @Override
    public Comment addComment(Comment comment) {
        return commentDao.save(comment);
    }

    @Override
    public Comment updateComment(Comment comment) {
        return commentDao.save(comment);
    }

    @Override
    public void deleteComment(Long idComment) {
        commentDao.deleteById(idComment);

    }

    @Override
    public Comment findClubById(Long idComment) {
        return commentDao.findById(idComment).get();
    }

    @Override
    public List<Comment> findAllComment() {
        return commentDao.findAll();
    }
}
