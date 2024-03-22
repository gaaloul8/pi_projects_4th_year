package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Post;
import com.esprit.pi_project.service.PostService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
@AllArgsConstructor
@Slf4j
public class PostController {

    private PostService postService;
    @PostMapping("/add")
    public Post addPost(@RequestBody Post post){
        return postService.addPost(post);
    }
    @PutMapping("/update")
    public Post updatePost(@RequestBody Post post){
        return postService.updatePost(post);
    }
    @GetMapping("/")
    public List<Post> getAllPosts(){
        return  postService.findAllPost();
    }
    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id){
        return postService.findPostById(id);  }
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id){
        postService.deletePost(id);
    }
}
