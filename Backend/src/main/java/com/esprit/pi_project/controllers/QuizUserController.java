package com.esprit.pi_project.controllers;


import com.esprit.pi_project.entities.Quiz;
import com.esprit.pi_project.entities.QuizUser;
import com.esprit.pi_project.services.QuizUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("passerQuiz")

public class QuizUserController {
    @Autowired
   QuizUserService quizUserService;

    @PostMapping("/{id}/passerQuiz")
    public void passerQuiz (@RequestBody QuizUser quizUser, @PathVariable Integer id) {
        quizUserService.ajouterQuizAUser(quizUser,id);
    }
    @GetMapping("all")
    public List<QuizUser> retrieveAllQuizUser() {

        return quizUserService.getAll();
    }
}
