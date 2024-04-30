
package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.QuizQuestion;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionQuizDao extends JpaRepository <QuizQuestion, Integer> {
    List<QuizQuestion> findByQuiz_IdQuiz(Integer idQuiz);

}
