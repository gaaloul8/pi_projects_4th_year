package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionQuizDao extends JpaRepository <QuizQuestion, Integer> {
}
