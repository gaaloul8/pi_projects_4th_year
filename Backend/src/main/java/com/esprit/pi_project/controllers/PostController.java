package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Post;
import com.esprit.pi_project.serviceImpl.BadWordService;
import com.esprit.pi_project.services.PostService;
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
    public ResponseEntity<String> addPost(@RequestParam("content") String content, @RequestParam("image") MultipartFile imageFile, HttpServletRequest request) {
        if (badWordService.containsBadWords(content)) {
            return ResponseEntity.badRequest().body("Hate speech alert. Please modify your description before posting.");
        }

        try {
            // Add the image file to the post and save it
            //postService.addPost(post, imageFile);
            postService.addPost(content, imageFile);

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
    @GetMapping("/monthly-count")
    public Map<Integer, Long> getMonthlyTransactionCounts() {
        return postService.countTransactionsByMonth();
    }

    @PutMapping("/updatepost/{postId}")
    public ResponseEntity<String> update(@PathVariable("postId") Long postId,@RequestParam("content") String content, @RequestParam("image") MultipartFile image, HttpServletRequest request) {
        if (badWordService.containsBadWords(content)) {
            return ResponseEntity.badRequest().body("Hate speech alert. Please modify your description before posting.");
        }

        try {
            Post updatedReward = postService.updatePost(postId,content,image);
            if (updatedReward != null) {
                return new ResponseEntity<>("Reward updated successfully", HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reward not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update reward");
        }
    }
}
