package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Forum;
import com.esprit.pi_project.entities.Post;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.serviceImpl.BadWordService;
import com.esprit.pi_project.services.PostService;
import com.esprit.pi_project.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private BadWordService badWordService;
    @Autowired
    private UserService userService;
    @PostMapping("/add")
    public ResponseEntity<Post> addPost(@RequestParam("content") String content, @RequestParam("image") MultipartFile imageFile, HttpServletRequest request) {


        try {
            // Add the image file to the post and save it
            //postService.addPost(post, imageFile);
            Optional<User> optionalUser = userService.getUserFromJwt(request);
            User user1 = optionalUser.get();


            return new ResponseEntity<>(postService.addPost(content, imageFile,user1), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Post>> getAllPosts(){
        return new ResponseEntity<>(postService.findAllPost(),HttpStatus.OK) ;
    }
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id){
        return new ResponseEntity<>(postService.findPostById(id),HttpStatus.OK);  }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id){
         postService.deletePost(id);
         return new ResponseEntity<>("Post delete successfully ",HttpStatus.OK);
    }
    @GetMapping("/getByDate/{postDate}")
    public ResponseEntity<List<Post>> getPostByDate(@PathVariable Date postDate){

        return new ResponseEntity<>(postService.findByPostDate(postDate),HttpStatus.OK);
    }
    @GetMapping("/monthly-count")
    public Map<Integer, Long> getMonthlyTransactionCounts() {
        return postService.countTransactionsByMonth();
    }

    @PutMapping("/updatepost/{postId}")
    public ResponseEntity<Post> update(@PathVariable("postId") Long postId,@RequestParam("content") String content, @RequestParam("image") MultipartFile image, HttpServletRequest request) {


        try {
            Optional<User> optionalUser = userService.getUserFromJwt(request);
            User user1 = optionalUser.get();
            Post updatedPost = postService.updatePost(postId,content,image,user1);
            if (updatedPost != null) {
                return new ResponseEntity<>(updatedPost, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PutMapping("/like/{postId}")
    public ResponseEntity<Post> likePost(@PathVariable Long postId) {
        Post likedPost = postService.likePost(postId);
        if (likedPost != null) {
            return new ResponseEntity<>(likedPost, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/dislike/{postId}")
    public ResponseEntity<Post> dislikePost(@PathVariable Long postId) {
        Post dislikedPost = postService.dislikePost(postId);
        if (dislikedPost != null) {
            return new ResponseEntity<>(dislikedPost, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/getconnecteduser")
    public Optional<User> getconnecteduser(HttpServletRequest request){
        return this.userService.getUserFromJwt(request);
    }
}
