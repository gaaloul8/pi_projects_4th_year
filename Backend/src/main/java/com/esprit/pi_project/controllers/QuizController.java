package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Quiz;
import com.esprit.pi_project.entities.QuizQuestion;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.QuizService;
import com.esprit.pi_project.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.esprit.pi_project.entities.Role.ClubManager;

@RestController
@RequestMapping("quiz")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
public class QuizController {
    @Autowired
    QuizService quizService;
    @Autowired
    UserService userService;

    @PostMapping("add")
    public void addQuiz(@RequestBody Quiz quiz, HttpServletRequest request) {
        Optional<User> user = userService.getUserFromJwt(request);

        if (user != null ){
            quiz.setQuizOwner(user.get());

        }
        quizService.addQuiz(quiz);
    }

    @GetMapping("all")
    public List<Quiz> retrieveAllQuiz() {

        return quizService.getAll();
    }
    @GetMapping("allowedToPublish")
    public List<Quiz> retrieveAllQuizAllowedToPublish() {

        return quizService.getAllAllowedToPublish();
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

    @PutMapping("publish")
    @ResponseBody
    public Quiz publishQuiz (@RequestBody Quiz quiz){
        return  quizService.publishQuiz(quiz);
    }
    @PutMapping("unpublish")
    @ResponseBody
    public Quiz unpublishQuiz (@RequestBody Quiz quiz){
        return  quizService.unpublishQuiz(quiz);
    }

}
