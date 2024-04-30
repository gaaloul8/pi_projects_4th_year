package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.FeedBack;
import com.esprit.pi_project.entities.StatusFeedback;
import com.esprit.pi_project.services.FeedBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FeedbackController {
    @Autowired
    private FeedBackService feedBackService;


    @PostMapping("/addFeedback/{idEvent}")
    public ResponseEntity<FeedBack> addFeedback(@PathVariable Integer idEvent,@RequestBody FeedBack feedBack)
    {   try {
        FeedBack addedFeedback = feedBackService.addFeedBack(idEvent, feedBack);
        return ResponseEntity.ok(addedFeedback);
    } catch (IllegalStateException e) {
        //return ResponseEntity.badRequest().body(e.getMessage());
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    }

    @PutMapping("/updateFeedback/{idFeedBack}")
    public ResponseEntity<FeedBack> updateFeedback(@PathVariable Integer idFeedBack, @RequestBody FeedBack feedBack) {
        FeedBack updatedFeedback = feedBackService.UpdateFeedBack(idFeedBack, feedBack);
        if (updatedFeedback != null) {
            updatedFeedback.setContent(updatedFeedback.getContent());
            return ResponseEntity.ok().body(updatedFeedback);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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
}
