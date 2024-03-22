package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Question;

import java.util.List;

public interface QuestionService {
    Question saveQuestion(Question question);

    Question updateQuestion(Question question);

    void deleteQuestion(Integer questionId);

    Question getQuestionById(Integer questionId);

    List<Question> getAllQuestions();
}
