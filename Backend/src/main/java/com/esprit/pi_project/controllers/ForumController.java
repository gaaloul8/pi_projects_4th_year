package com.esprit.pi_project.controllers;

import com.esprit.pi_project.dao.ForumDao;
import com.esprit.pi_project.entities.*;
import com.esprit.pi_project.services.ForumService;
import com.esprit.pi_project.services.LanguageDetectionService;
import com.esprit.pi_project.services.UserService;
import com.restfb.*;
import com.restfb.exception.FacebookException;
import com.restfb.types.FacebookType;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/forums")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ForumController {

    @Autowired
    private ForumService forumService;
    @Autowired
    private ForumDao forumDao;
    @Autowired
    private final LanguageDetectionService languageDetectionService;
    @Autowired
    private UserService userService;


    @Value("${facebook.access.token}")
    private String facebookAccessToken;
    @Value("${facebook.pageid}")
    private String pageId;

    @PostMapping("/share-on-facebook")
    public ResponseEntity<String> shareOnFacebook(@RequestParam String message) {
String pictureUrl = "https://www.drhakandoganay.com/wp-content/uploads/2020/06/hair-transplant-forum.jpg";
        try {

            FacebookClient facebookClient = new DefaultFacebookClient(facebookAccessToken, Version.LATEST);

            facebookClient.publish("me/photos", FacebookType.class,
                    BinaryAttachment.with("photo", new URL(pictureUrl).openStream()),
                    Parameter.with("message", message));


            return ResponseEntity.ok().body("Shared on Facebook page successfully!");
        } catch (IOException | FacebookException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to share on Facebook: " + e.getMessage());
        }
    }


    @PostMapping("/addForum")
    public ResponseEntity<Forum> createForum(@RequestBody Forum forum ,HttpServletRequest request
    ) {
       Optional<User> user = userService.getUserFromJwt(request);
       if(user != null){
           forum.setForumOwner(user.get());
           Forum createdForum = forumService.saveForum(forum);
           return new ResponseEntity<>(createdForum, HttpStatus.CREATED);
       } else
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @GetMapping("/{forumId}")
    public ResponseEntity<Forum> getForumById(@PathVariable Integer forumId) {
        Forum forum = forumService.getForumById(forumId);
        if (forum != null) {
            return new ResponseEntity<>(forum, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getAllForums")
    public ResponseEntity<List<Forum>> getAllForums() {
        List<Forum> forums = forumService.getAllForums();
        return new ResponseEntity<>(forums, HttpStatus.OK);
    }
    @GetMapping("/searchByStatus/{status}")
    public List<Forum> searchForumByStatus (@PathVariable ForumStatus status)
    {
        return forumDao.findForumByStatus(status);
    }
    @GetMapping("/getForumWithBestAnswers")
    public List<Object[]> getBestForums ()
    {
        return forumDao.findForumWithBestAnswers();
    }
    @GetMapping("/getForumWithQuestiondAndResponse")
    public List<Object[]> GetForumsWithQuestionsAndResponses ()
    {
        return forumDao.findForumWithQuestionsAndResponses();
    }
    @PutMapping("/{forumId}")
    public ResponseEntity<Forum> updateForum(@PathVariable Integer forumId, @RequestBody Forum forumDetails) {
        Forum forum = forumService.getForumById(forumId);
        if (forum != null) {
            if(forumDetails.getTopic() != null) {
                forum.setTopic(forumDetails.getTopic());
            }
            if(forumDetails.getContent() != null) {
                forum.setContent(forumDetails.getContent());
            }
            if(forumDetails.getLikes() != null) {
                forum.setLikes(forumDetails.getLikes());
            }
            if(forumDetails.getClosed() != null) {
                forum.setClosed(forumDetails.getClosed());
            }
            if(forumDetails.getStatus() != null) {
                forum.setStatus(forumDetails.getStatus());
            }

            if(forumDetails.getCreatedAt() != null){
                forum.setCreatedAt(forumDetails.getCreatedAt());
            }
            Forum updatedForum = forumService.updateForum(forum);
            return new ResponseEntity<>(updatedForum, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{forumId}")
    public ResponseEntity<Void> deleteForum(@PathVariable Integer forumId) {
        forumService.deleteForum(forumId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/like/{forumId}")
    public ResponseEntity<Forum> likeForum(@PathVariable Integer forumId) {
        Forum likedForum = forumService.likeForum(forumId);
        if (likedForum != null) {
            return new ResponseEntity<>(likedForum, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/getuser")
    public Optional<User> getconnecteduser(HttpServletRequest request){
        return this.userService.getUserFromJwt(request);
    }

    @PutMapping("/dislike/{forumId}")
    public ResponseEntity<Forum> dislikeForum(@PathVariable Integer forumId) {
        Forum dislikedForum = forumService.dislikeForum(forumId);
        if (dislikedForum != null) {
            return new ResponseEntity<>(dislikedForum, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/detectLanguage")
    public ResponseEntity<String> detectLanguage(@RequestBody String text) {
        String detectedLanguage = languageDetectionService.detectLanguage(text);
        return new ResponseEntity<>(detectedLanguage, HttpStatus.OK);
    }
}
