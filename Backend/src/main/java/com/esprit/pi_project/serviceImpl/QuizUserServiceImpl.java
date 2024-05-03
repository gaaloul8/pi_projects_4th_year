package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.QuizDao;
import com.esprit.pi_project.dao.QuizUserDao;

import com.esprit.pi_project.entities.Quiz;


import com.esprit.pi_project.entities.QuizQuestion;
import com.esprit.pi_project.entities.QuizUser;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.QuizUserService;
import com.esprit.pi_project.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.esprit.pi_project.utilities.OpenAiServiceImpl.chatGPT;
@Service
@AllArgsConstructor
public class QuizUserServiceImpl implements QuizUserService {
    QuizUserDao quizUserDao;
    QuizDao quizDao;

    UserService userService;

    @Override
    public QuizUser ajouterQuizAUser(QuizUser quizUser, Integer idQuiz) {
        Quiz quiz = quizDao.findById(idQuiz).orElseThrow(() ->
                new IllegalArgumentException("Quiz non trouvé avec l'ID : " + idQuiz));

        quizUser.setQuiz(quiz);
        quizUser.setParticipationDate(new Date());
        //List<QuizQuestion> questions =quiz.getQuestions();

        List<String> questions = new ArrayList<>();
        for(QuizQuestion question:quiz.getQuestions())
            questions.add(question.getContent());

        List<String> reponses = new ArrayList<>();
        reponses=quizUser.getReponses();
       
        String msg = chatGPT("je vais te fournir une liste de question "+questions.toString()+"et de reponse "+reponses.toString()+
                " je veux que tu fais l'interpretation de l'etat psychologique et repns comme si tu repdons à la personne qui a passe le questionnaire en 3 phrases en anglais");

        quizUser.setDescription(msg);
        System.out.println(msg);
        QuizUser savedQuizUser= quizUserDao.save(quizUser);
        quiz.getQuizUsers().add(savedQuizUser);

        quizDao.save(quiz);

        return savedQuizUser;
    }

    @Override
    public List<QuizUser> getAll() {
        return  quizUserDao.findAll();
    }


    public List<Object[]> getQuizUserParticipationDatesAndCounts() {
        return quizUserDao.getQuizUserParticipationDatesAndCounts();
    }

  @Override
    public QuizUser getALLPartication(Integer idQuiz , User user) {


        return   quizUserDao.findAllByQuizIdAndUser(idQuiz,user);

    }
}
