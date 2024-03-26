package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizDao extends JpaRepository <Quiz,Integer> {

}
