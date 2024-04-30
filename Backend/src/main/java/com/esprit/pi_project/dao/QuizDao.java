
package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizDao extends JpaRepository <Quiz,Integer> {

    List<Quiz> getAllByPublication(boolean pub);
}
