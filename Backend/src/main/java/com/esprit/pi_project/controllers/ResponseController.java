package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Response;
import com.esprit.pi_project.services.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("/responses")
@RequiredArgsConstructor
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
}
