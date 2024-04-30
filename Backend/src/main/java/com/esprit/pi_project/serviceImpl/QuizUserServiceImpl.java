package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.QuizDao;
import com.esprit.pi_project.dao.QuizUserDao;
import com.esprit.pi_project.entities.Quiz;


import com.esprit.pi_project.entities.QuizQuestion;
import com.esprit.pi_project.entities.QuizUser;
import com.esprit.pi_project.services.QuizUserService;
import com.esprit.pi_project.utilities.OpenAiServiceImpl;
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

    @Override
    public QuizUser ajouterQuizAUser(QuizUser quizUser, Integer idQuiz) {
        Quiz quiz = quizDao.findById(idQuiz).orElseThrow(() ->
                new IllegalArgumentException("Quiz non trouvé avec l'ID : " + idQuiz));

        quizUser.setQuiz(quiz);
        quizUser.setParticipationDate(new Date());
        //List<QuizQuestion> questions =quiz.getQuestions();

        List<String> questions = new ArrayList<>();

        // Ajout des questions à la liste
        questions.add("Comment vous sentez-vous généralement sur une échelle de 1 à 10, où 1 est très mal et 10 est très bien ?");
        questions.add("Avez-vous récemment ressenti une tristesse, une nervosité ou une anxiété persistante ?");
        questions.add("Avez-vous des difficultés à entretenir des relations avec votre famille, vos amis ou vos collègues ?");
        questions.add("Avez-vous des pensées négatives ou des sentiments d'insécurité à propos de vous-même ou de votre avenir ?");

        List<String> reponses = new ArrayList<>();
        reponses.add("Je me sens à 7 aujourd'hui.");
        reponses.add("Oui, je me sens souvent anxieux ces derniers temps.");
        reponses.add("Oui, j'ai du mal à entretenir des relations avec ma famille.");
        reponses.add("Oui, je lutte souvent avec des pensées négatives à propos de moi-même.");

        String msg = chatGPT("je vais te fournir une liste de question "+questions.toString()+"et de reponse "+reponses.toString()+
                " je veux que tu fais l'interpretation de l'etat psychologique et repns comme si tu repdons à la personne qui a passe le questionnaire  ");

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
}
