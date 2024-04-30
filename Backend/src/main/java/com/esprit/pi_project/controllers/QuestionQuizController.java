
package com.esprit.pi_project.controllers;


import com.esprit.pi_project.entities.Quiz;
import com.esprit.pi_project.entities.QuizOption;
import com.esprit.pi_project.entities.QuizQuestion;
import com.esprit.pi_project.services.OptionService;
import com.esprit.pi_project.services.QuestionQuizService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("questionq")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
public class QuestionQuizController {

    QuestionQuizService questionService;
    OptionService optionService;

    @PostMapping("/{id}/questions")
    public QuizQuestion addQuestionToQuiz(@RequestBody QuizQuestion question,@PathVariable Integer id) {
        return questionService.ajouterQuestAQuiz(question,id);
    }

    @GetMapping("all")
    public List<QuizQuestion> retrieveAllQuestion() {

        return questionService.getAll();
    }
    @DeleteMapping("delete")
    @ResponseBody
    public void delete (@RequestBody QuizQuestion question ){


        this.questionService.removeQuestion(question);
    }

    @PutMapping("update")
    @ResponseBody
    public QuizQuestion updateQuestion (@RequestBody QuizQuestion question){

        return  questionService.updateQuestion(question);
    }

    @GetMapping("/by-quiz/{quizId}")
    public List<QuizQuestion> getQuestionsByQuizId(@PathVariable Integer quizId) {
       return  questionService.getAllQuestionByQuizId(quizId);

    }
}

