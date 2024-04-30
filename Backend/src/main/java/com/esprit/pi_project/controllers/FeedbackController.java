
package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.FeedBack;
import com.esprit.pi_project.entities.StatusFeedback;
import com.esprit.pi_project.services.FeedBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {
    @Autowired
    private FeedBackService feedBackService;


    @PostMapping("/addFeedback/{idEvent}")
    public ResponseEntity<FeedBack> addFeedback(@PathVariable Integer idEvent,@RequestBody FeedBack feedBack)
    {   try {
        FeedBack addedFeedback = feedBackService.addFeedBack(idEvent, feedBack);
        return ResponseEntity.ok(addedFeedback);
    } catch (IllegalStateException e) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    }

    @PutMapping("/updateFeedback")
    public FeedBack updateFeedback(@RequestBody FeedBack feedBack) {
        return feedBackService.UpdateFeedBack(feedBack);

    }

    @DeleteMapping("/deleteFeedback/{idFeedback}")
    public ResponseEntity<String> deleteFeedbackById(@PathVariable Integer idFeedback) {
        try {
            feedBackService.deleteFeedBackByidFeedback(idFeedback);
            return ResponseEntity.ok().body("Feedback deleted successfully.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/getAllFeedBack")
    public List<FeedBack> getAFeedBack(){
        return feedBackService.findAll();
    }

    @GetMapping("/searchFeedbackByStatus/{statusFeedback}")
    public List<FeedBack> searchFeedbackByStatus(@PathVariable StatusFeedback statusFeedback)
    {return feedBackService.searchFeedBackByStatus(statusFeedback);}


    @GetMapping("/getFeedBackById/{idFeedback}")
    public Optional<FeedBack> getfeedbackbyid(@PathVariable int idFeedback)
    {
        return feedBackService.findByidFeedback(idFeedback);
    }
}

