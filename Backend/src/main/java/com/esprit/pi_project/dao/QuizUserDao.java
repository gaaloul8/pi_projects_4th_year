package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.QuizUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizUserDao extends JpaRepository <QuizUser,Integer> {
}
