
package com.esprit.pi_project.controllers;


import com.esprit.pi_project.entities.QuizUser;
import com.esprit.pi_project.services.QuizUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("passerQuiz")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")

public class QuizUserController {
    @Autowired
   QuizUserService quizUserService;

    @PostMapping("/{id}/passerQuiz")
    public ResponseEntity<Object> passerQuiz(@RequestBody QuizUser quizUser, @PathVariable Integer id) {
        QuizUser savedQuizUser = quizUserService.ajouterQuizAUser(quizUser, id);
        String description = savedQuizUser.getDescription();
        return ResponseEntity.ok().body(Map.of("description", description));
    }
    @GetMapping("all")
    public List<QuizUser> retrieveAllQuizUser() {

        return quizUserService.getAll();
    }

    @GetMapping("getQuizUserParticipationDatesAndCounts")
    public List<Object[]> getQuizUserParticipationDatesAndCounts() {

        return quizUserService.getQuizUserParticipationDatesAndCounts();
    }
}

