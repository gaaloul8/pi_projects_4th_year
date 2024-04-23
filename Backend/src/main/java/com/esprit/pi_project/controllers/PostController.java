package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Post;
import com.esprit.pi_project.serviceImpl.BadWordService;
import com.esprit.pi_project.services.PostService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

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
    @PostMapping("/add")
    public ResponseEntity<String> addPost(@ModelAttribute Post post, @RequestParam("image") MultipartFile imageFile) {
        if (badWordService.containsBadWords(post.getContent())) {
            return ResponseEntity.badRequest().body("Hate speech alert. Please modify your description before posting.");
        }

        try {
            // Add the image file to the post and save it
            postService.addPost(post, imageFile);

            return new ResponseEntity<>("Post added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add post");
        }
    }
    @PutMapping("/update")
    public ResponseEntity<String> updatePost(@RequestBody Post post){
         postService.updatePost(post);
        return new ResponseEntity<>("Post updated successfully"
                ,HttpStatus.OK);
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
}
