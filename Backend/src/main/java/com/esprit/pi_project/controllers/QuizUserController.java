package com.esprit.pi_project.controllers;


import com.esprit.pi_project.entities.QuizUser;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.EmailSender;
import com.esprit.pi_project.services.LinkedInScrapper;
import com.esprit.pi_project.services.QuizUserService;
import com.esprit.pi_project.services.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("passerQuiz")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")

public class QuizUserController {
    @Autowired
   QuizUserService quizUserService;
    @Autowired
    LinkedInScrapper linkedInScrapper;
    @Autowired
    UserService userService;
    @Autowired
    EmailSender emailSender;

    @PostMapping("/{id}/passerQuiz")
    public ResponseEntity<Object> passerQuiz(@RequestBody QuizUser quizUser, @PathVariable Integer id, HttpServletRequest request) {
        Optional<User> user = userService.getUserFromJwt(request);
        if (user != null){
            quizUser.setQuizUser(user.get());

            System.out.println(user.get().getEmail());
        }

        QuizUser savedQuizUser = quizUserService.ajouterQuizAUser(quizUser, id);
        String description = savedQuizUser.getDescription();

       // String to= "blachyto2000@gmail.com";
        String to =user.get().getEmail();
        String subject="Quiz Result";
        String content = "Dear student,\n\n" +
                "Thank you very much for having the courage to take this psychological test! 👏\n" +
                "Here are the results of the questionnaire : \n" +
                description + "\n\n" +
                "Keep up the good work and remember that every little step counts! 💪\n\n" +
                "Best regards,\n";

        try {
            emailSender.sendEmail(to,subject,content);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

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
    @GetMapping("all/{idQuiz}")
    public QuizUser retrieveQuizUserParticipation (@PathVariable Integer idQuiz ,HttpServletRequest request ) {
        Optional<User> user = userService.getUserFromJwt(request);
        //System.out.println(user.get());
        return quizUserService.getALLPartication(idQuiz, user.get() );
    }

   @GetMapping("doctors")
   public ResponseEntity<Object> retrieveAllDocters() throws IOException {

    //   String doctors =linkedInScrapper.getDataFromCsv();
    //    return ResponseEntity.ok().body(Map.of("doctors", doctors));
       String filePath = "../Backend/psychiatrist_data.csv"; // Mettez le chemin d'accès correct à votre fichier CSV ici
       String csvData = Files.lines(Paths.get(filePath)).collect(Collectors.joining("\n"));
       return  ResponseEntity.ok().body(Map.of("csvData", csvData));
   }

    @GetMapping("score")
    public Map<String, Double> retrieveScore () {

        return quizUserService.calculateAverageScores();
    }

}
