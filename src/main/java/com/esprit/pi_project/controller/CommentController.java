package com.esprit.pi_project.controller;

import com.esprit.pi_project.entities.Comment;
import com.esprit.pi_project.entities.Post;
import com.esprit.pi_project.service.CommentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@AllArgsConstructor
@Slf4j
public class CommentController {

    private CommentService commentService;
    @PostMapping("/add")
    public Comment addComment(@RequestBody Comment comment){
        return commentService.addComment(comment);
    }
    @PutMapping("/update")
    public Comment updateComment(@RequestBody Comment comment){
        return commentService.updateComment(comment);
    }
    @GetMapping("/")
    public List<Comment> getAllcomments(){
        return  commentService.findAllComment();
    }
    @GetMapping("/{id}")
    public Comment getCommentById(@PathVariable Long id){
        return commentService.findClubById(id) ; }
    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id){
        commentService.deleteComment(id);
    }

}
