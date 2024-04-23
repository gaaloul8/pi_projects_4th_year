package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Comment;
import com.esprit.pi_project.serviceImpl.BadWordService;
import com.esprit.pi_project.services.CommentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@AllArgsConstructor
@Slf4j
public class CommentController {

    private CommentService commentService;
    private BadWordService badWordService;
    @PostMapping("/add/{idPost}")
    public ResponseEntity<String> addComment(@RequestBody Comment comment, @PathVariable Long idPost){
        if (badWordService.containsBadWords(comment.getContent())){
            return new  ResponseEntity<>("Hate speech alert. Please modify your comment before posting.",
                    HttpStatus.CREATED);
        }
         commentService.addComment(comment,idPost);
        return new ResponseEntity<>("Comment added successfully",
                HttpStatus.CREATED);
    }
    @PutMapping("/update")
    public ResponseEntity<String> updateComment(@RequestBody Comment comment){
         commentService.updateComment(comment);
        return new ResponseEntity<>("Comment updated successfully"
                ,HttpStatus.OK);
    }
    @GetMapping("/getall")
    public ResponseEntity<List<Comment>> getAllcomments(){
        return new ResponseEntity<>(commentService.findAllComments(),HttpStatus.OK) ;
    }
    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id){
        return new ResponseEntity<>(commentService.findCommentById(id),HttpStatus.OK) ; }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Long id){
         commentService.deleteComment(id);
        return new ResponseEntity<>("Comment with Id " + id +" deleted successfully",HttpStatus.OK);
    }

}
