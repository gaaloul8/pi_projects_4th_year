package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Question;
import com.esprit.pi_project.services.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/addQuestion")
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        Question createdQuestion = questionService.saveQuestion(question);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Integer questionId) {
        Question question = questionService.getQuestionById(questionId);
        if (question != null) {
            return new ResponseEntity<>(question, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getAllQuestions")
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PutMapping("/{questionId}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Integer questionId, @RequestBody Question questionDetails) {
        Question question = questionService.getQuestionById(questionId);
        if (question != null) {
            question.setTitle(questionDetails.getTitle());
            question.setContent(questionDetails.getContent());
            question.setUpvotes(questionDetails.getUpvotes());
            question.setClosed(questionDetails.getClosed());
            Question updatedQuestion = questionService.updateQuestion(question);
            return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Integer questionId) {
        questionService.deleteQuestion(questionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
