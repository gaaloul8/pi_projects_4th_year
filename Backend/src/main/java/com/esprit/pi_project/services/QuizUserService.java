package com.esprit.pi_project.services;



import com.esprit.pi_project.entities.QuizUser;

import java.util.List;

public interface QuizUserService {

    QuizUser ajouterQuizAUser (QuizUser quizUser, Integer idQuiz);

    List<QuizUser> getAll();
}
