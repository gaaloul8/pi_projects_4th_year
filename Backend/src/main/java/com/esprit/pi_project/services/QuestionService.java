package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Question;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface QuestionService {
    Question saveQuestion(Question question);

    Question updateQuestion(Question question);

    void deleteQuestion(Integer questionId);

    Question getQuestionById(Integer questionId);

    List<Question> getAllQuestions();

    List<Question> searchQuestions(String keyword);

    Question upvoteQuestion(Integer questionId);

    Question downvoteQuestion(Integer questionId);

    Question closeQuestion(Integer questionId);

    List<Question> getAllQuestionsByForumId(Integer forumId);
    ResponseEntity<String> filterText(String text);

    }

