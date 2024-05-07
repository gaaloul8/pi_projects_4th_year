package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.CommentDao;
import com.esprit.pi_project.dao.PostDao;
import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Comment;
import com.esprit.pi_project.entities.Post;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.CommentService;
import com.esprit.pi_project.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service

public class CommentServiceImp implements CommentService {
    @Autowired
    private CommentDao commentDao;
    @Autowired
    private PostService postService;
    @Autowired
    private PostDao postDao;
    @Override

    public Comment addComment(Comment comment, Long idPost, User user) throws ParseException {

        comment.setUser(user);
        Date currentDateTime = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        String formattedDate = dateFormat.format(currentDateTime);
        Date parsedDate = dateFormat.parse(formattedDate);
        Post post = postService.findPostById(idPost);
        comment.setPost(post);
        comment.setDate(new Date());
        post.getComments().add(comment);

        return commentDao.save(comment);
    }
@Override
    public Comment updateComment(Comment comment) {

        return commentDao.save(comment);
    }
@Override
    public void  deleteComment(Long idComment) {


        commentDao.deleteById(idComment);
    }
@Override
    public Comment findCommentById(Long idComment) {
        Optional<Comment> commentOptional = commentDao.findById(idComment);
        return commentOptional.orElse(null);
    }
@Override
    public List<Comment> findAllComments() {
        return commentDao.findAll();
    }

    @Override
    public List<Comment> findbyPost(Long postId) {
        return commentDao.findAllByPostPostId(postId);
    }
}
