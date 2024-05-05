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
import java.util.Map;
import java.util.HashMap;

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
        String scoreStress = chatGPT("à partir les questions "+questions.toString()+"et les reponses "+ reponses.toString()+"donne moi un pourcentage pour le niveau , de stress , anxiete , depression etc , ecris comme cette  exemple anxiete:%,stress:% etc et il sont separé pa vergule dans la meme ligne et en anglais");
        System.out.println(scoreStress);
        quizUser.setScore(scoreStress);
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


    public Map<String, Double> calculateAverageScores() {
        // Définir un HashMap pour stocker les totaux des scores et les comptages pour chaque mot-clé
        Map<String, Double> totalScores = new HashMap<>();
        Map<String, Integer> counts = new HashMap<>();

        // Récupérer les données de la base de données
        List<String> scoresList = quizUserDao.findAllScores();

        // Parcourir chaque score extrait de la base de données
        for (String scoreStr : scoresList) {
            // Séparer les mots-clés et les scores
            String[] keywordAndScorePairs = scoreStr.split(", ");
            for (String pair : keywordAndScorePairs) {
                // Séparer le mot-clé et le score
                String[] parts = pair.split(": ");
                String keyword = parts[0].trim();
                int score = Integer.parseInt(parts[1].replace("%", "").trim());

                // Mettre à jour le total des scores et le comptage pour ce mot-clé
                totalScores.put(keyword, totalScores.getOrDefault(keyword, 0.0) + score);
                counts.put(keyword, counts.getOrDefault(keyword, 0) + 1);
            }
        }

        // Calculer les moyennes des scores pour chaque mot-clé
        Map<String, Double> averageScores = new HashMap<>();
        for (String keyword : totalScores.keySet()) {
            double totalScore = totalScores.get(keyword);
            int count = counts.get(keyword);
            double averageScore = totalScore / count;
            averageScores.put(keyword, averageScore);
        }

        return averageScores;
    }

}
