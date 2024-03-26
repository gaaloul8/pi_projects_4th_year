package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Quiz;
import com.esprit.pi_project.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("quiz")
public class QuizController {
    @Autowired
    QuizService quizService;

    @PostMapping("add")
    public void addQuiz(@RequestBody Quiz quiz) {
        quizService.addQuiz(quiz);
    }

    @GetMapping("all")
    public List<Quiz> retrieveAllQuiz() {

        return quizService.getAll();
    }

    @PutMapping("update")
    @ResponseBody
    public Quiz updateQuiz (@RequestBody Quiz quiz){
        return  quizService.updateQuiz(quiz);
    }

    @GetMapping("getQuiz/{idQuiz}")
    public Quiz findById(@PathVariable Integer idQuiz) {

        return quizService.findById(idQuiz);
    }
    @DeleteMapping("delete")
    @ResponseBody
    public void delete (@RequestBody Quiz quiz ){
        this.quizService.removeQuiz(quiz);
    }
}
