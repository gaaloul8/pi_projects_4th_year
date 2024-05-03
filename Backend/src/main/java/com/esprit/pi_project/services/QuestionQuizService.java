package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Quiz;
import com.esprit.pi_project.entities.QuizQuestion;

import java.util.List;

public interface QuestionQuizService {

    List<QuizQuestion> getAll();
    List<QuizQuestion> getAllQuestionByQuizId(Integer idQuiz);

    QuizQuestion addQuestion (QuizQuestion question);
    QuizQuestion updateQuestion (QuizQuestion question);


    void removeQuestion (QuizQuestion quiz);

    QuizQuestion findById(Integer idQuestion);
    public QuizQuestion ajouterQuestAQuiz(QuizQuestion question, Integer idQuiz);
}
