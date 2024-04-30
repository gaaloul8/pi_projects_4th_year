
package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Forum;
import com.esprit.pi_project.entities.Question;
import com.esprit.pi_project.entities.Response;
import com.esprit.pi_project.services.ResponseService;
import com.esprit.pi_project.services.SentimentAnalyzerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController()
@RequestMapping("/responses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ResponseController {

    @Autowired
    private ResponseService responseService;

    @PostMapping("/addResponse")
    public ResponseEntity<Response> createResponse(@RequestBody Response response) {
        Response createdResponse = responseService.saveResponse(response);
        return new ResponseEntity<>(createdResponse, HttpStatus.CREATED);
    }

    @GetMapping("/{responseId}")
    public ResponseEntity<Response> getResponseById(@PathVariable Integer responseId) {
        Response response = responseService.getResponseById(responseId);
        if (response != null) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getAllResponses")
    public ResponseEntity<List<Response>> getAllResponses() {
        List<Response> responses = responseService.getAllResponses();
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
    @GetMapping("/response/{questionId}")
    public List<Response> getAllQuestionsByForumId(@PathVariable Integer questionId) {
        return responseService.getResponsesByQuestionId(questionId);
    }

    @PutMapping("/{responseId}")
    public ResponseEntity<Response> updateResponse(@PathVariable Integer responseId, @RequestBody Response responseDetails) {
        Response response = responseService.getResponseById(responseId);
        if (response != null) {
            response.setContent(responseDetails.getContent());
            response.setUpvotes(responseDetails.getUpvotes());
            response.setAccepted(responseDetails.getAccepted());
            response.setReported(responseDetails.getReported());
            Response updatedResponse = responseService.updateResponse(response);
            return new ResponseEntity<>(updatedResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{responseId}")
    public ResponseEntity<Void> deleteResponse(@PathVariable Integer responseId) {
        responseService.deleteResponse(responseId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/upvote/{responseId}")
    public ResponseEntity<Response> upvoteResponse(@PathVariable Integer responseId) {
        Response upvotedResponse = responseService.upvoteResponse(responseId);
        if (upvotedResponse != null) {
            return new ResponseEntity<>(upvotedResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/downvote/{responseId}")
    public ResponseEntity<Response> downvoteResponse(@PathVariable Integer responseId) {
        Response downvotedResponse = responseService.downvoteResponse(responseId);
        if (downvotedResponse != null) {
            return new ResponseEntity<>(downvotedResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @Autowired
    private SentimentAnalyzerService sentimentAnalyzerService;

    @PostMapping("/analyzeSentiment")
    public ResponseEntity<String> analyzeSentiment(@RequestBody String text) {
        String sentiment = sentimentAnalyzerService.analyzeSentiment(text);
        return new ResponseEntity<>(sentiment, HttpStatus.OK);
    }

}

