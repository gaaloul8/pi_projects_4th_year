package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Comment;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.serviceImpl.BadWordService;
import com.esprit.pi_project.services.CommentService;
import com.esprit.pi_project.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
public class CommentController {

    private CommentService commentService;
    private BadWordService badWordService;
    private UserService userService;
    @PostMapping("/add/{idPost}")
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment, @PathVariable Long idPost, HttpServletRequest request) throws ParseException {

        Optional<User> optionalUser = userService.getUserFromJwt(request);
        User user1 = optionalUser.get();

        return new ResponseEntity<>(commentService.addComment(comment,idPost,user1),
                HttpStatus.CREATED);
    }
    @PutMapping("/update")
        public ResponseEntity<Comment> updateComment(@RequestBody Comment comment, HttpServletRequest request){
        Optional<User> optionalUser = userService.getUserFromJwt(request);
        User user1 = optionalUser.get();

        return new ResponseEntity<>(commentService.updateComment(comment,user1)
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
    public ResponseEntity<Comment> deleteComment(@PathVariable Long id){
         commentService.deleteComment(id);
        return new ResponseEntity<Comment>(HttpStatus.OK);
    }
    @GetMapping("/findbyPost/{id}")
    public ResponseEntity<List<Comment>> getallcommentsPost(@PathVariable Long id){

        return new ResponseEntity<>(commentService.findbyPost(id),HttpStatus.OK);
    }
    @GetMapping("/getconnecteduser")
    public Optional<User> getconnecteduser(HttpServletRequest request){
        return this.userService.getUserFromJwt(request);
    }

}
