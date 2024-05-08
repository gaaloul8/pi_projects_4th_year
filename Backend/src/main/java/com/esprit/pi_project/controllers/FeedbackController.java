package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.FeedBack;
import com.esprit.pi_project.entities.StatusFeedback;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.FeedBackService;
import com.esprit.pi_project.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {
    @Autowired
    private FeedBackService feedBackService;
    @Autowired
    private UserService userService;

    @GetMapping("/getuser")
    public Optional<User> getconnecteduser(HttpServletRequest request){
        return this.userService.getUserFromJwt(request);
    }

    @PostMapping("/addFeedback/{idEvent}")
    public ResponseEntity<FeedBack> addFeedback(@PathVariable Integer idEvent,
                                                @RequestBody FeedBack feedBack,
                                                HttpServletRequest request) throws IOException{
        Optional<User> optionalUser = userService.getUserFromJwt(request);
        User user= optionalUser.get();
        try {
            feedBackService.addFeedBack(idEvent,feedBack,user);
            feedBack = feedBackService.analyzeSentimentAndSetStatus(feedBack); // Analyser le sentiment et définir le statut
            // Sauvegarder à nouveau le feedback avec le statut mis à jour
            feedBack = feedBackService.UpdateFeedBack(feedBack,user);
            return ResponseEntity.ok(feedBack);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/{idFeedback}")
    public ResponseEntity<FeedBack> updateFeedBack(@PathVariable Integer idFeedback,
                                                   @RequestBody FeedBack feedBack,
                                                   HttpServletRequest request) throws IOException {
        Optional<User> optionalUser = userService.getUserFromJwt(request);
        User user= optionalUser.get();
        FeedBack addedFeedback = feedBackService.findByidFeedback(idFeedback);
        System.out.println(feedBack.getRating());
        if (addedFeedback != null) {

            if (feedBack.getContent() != null) {
                addedFeedback.setContent(feedBack.getContent());
            }

            if (feedBack.getRating() != 0) {

                addedFeedback.setRating(feedBack.getRating());
            }
            if (feedBack.getUser() != null) {
                addedFeedback.setUser(user);
            }
            FeedBack updatedFeed = feedBackService.UpdateFeedBack(addedFeedback,user);
            return new ResponseEntity<>(updatedFeed, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @DeleteMapping("/deleteFeedback/{idFeedback}")
    public ResponseEntity<String> deleteFeedbackById(@PathVariable Integer idFeedback) {
            feedBackService.deleteFeedBackByidFeedback(idFeedback);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }


    @GetMapping("/getAllFeedBack")
    public List<FeedBack> getAFeedBack() {
        return feedBackService.findAll();
    }

    @GetMapping("/searchFeedbackByStatus/{statusFeedback}")
    public List<FeedBack> searchFeedbackByStatus(@PathVariable StatusFeedback statusFeedback) {
        return feedBackService.searchFeedBackByStatus(statusFeedback);
    }


    @GetMapping("/getFeedBackById/{idFeedback}")
    public FeedBack getfeedbackbyid(@PathVariable int idFeedback) {
        return feedBackService.findByidFeedback(idFeedback);
    }

    @GetMapping("/{eventId}/average-rating")
    public ResponseEntity<Double> getAverageRatingByEventId(@PathVariable int eventId) {
        // Call the service method to get the average rating by event ID
        return feedBackService.findAverageRatingByEventId(eventId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/events/{eventId}/feedbacks")
    public List<FeedBack> getFeedbacksByEventId(@PathVariable Integer eventId) {
        return feedBackService.getFeedbacksByEventId(eventId);
    }




    @GetMapping("/feedback/statistics")
    public ResponseEntity<Map<String, Long>> getFeedbackStatistics() {
        Map<String, Long> statistics = feedBackService.getFeedbackStatistics();
        return ResponseEntity.ok(statistics);
    }


}

