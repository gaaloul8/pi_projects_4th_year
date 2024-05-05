package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.QuizOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizOptionDao extends JpaRepository <QuizOption ,Integer> {

    QuizOption findByContent(String content);

}