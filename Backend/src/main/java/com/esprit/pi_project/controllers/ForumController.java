package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Forum;
import com.esprit.pi_project.services.ForumService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/forums")
@RequiredArgsConstructor
public class ForumController {

    @Autowired
    private ForumService forumService;

    @CrossOrigin(origins = "*")
    @PostMapping("/addForum")
    public ResponseEntity<Forum> createForum(@RequestBody Forum forum) {
        Forum createdForum = forumService.saveForum(forum);
        return new ResponseEntity<>(createdForum, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{forumId}")
    public ResponseEntity<Forum> getForumById(@PathVariable Integer forumId) {
        Forum forum = forumService.getForumById(forumId);
        if (forum != null) {
            return new ResponseEntity<>(forum, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllForums")
    public ResponseEntity<List<Forum>> getAllForums() {
        List<Forum> forums = forumService.getAllForums();
        return new ResponseEntity<>(forums, HttpStatus.OK);
    }
    @CrossOrigin(origins = "*")
    @PutMapping("/{forumId}")
    public ResponseEntity<Forum> updateForum(@PathVariable Integer forumId, @RequestBody Forum forumDetails) {
        Forum forum = forumService.getForumById(forumId);
        if (forum != null) {
            forum.setTopic(forumDetails.getTopic());
            forum.setContent(forumDetails.getContent());
            forum.setLikes(forumDetails.getLikes());
            forum.setClosed(forumDetails.getClosed());
            Forum updatedForum = forumService.updateForum(forum);
            return new ResponseEntity<>(updatedForum, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/{forumId}")
    public ResponseEntity<Void> deleteForum(@PathVariable Integer forumId) {
        forumService.deleteForum(forumId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @CrossOrigin(origins = "*")
    @PutMapping("/like/{forumId}")
    public ResponseEntity<Forum> likeForum(@PathVariable Integer forumId) {
        Forum likedForum = forumService.likeForum(forumId);
        if (likedForum != null) {
            return new ResponseEntity<>(likedForum, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/dislike/{forumId}")
    public ResponseEntity<Forum> dislikeForum(@PathVariable Integer forumId) {
        Forum dislikedForum = forumService.dislikeForum(forumId);
        if (dislikedForum != null) {
            return new ResponseEntity<>(dislikedForum, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
