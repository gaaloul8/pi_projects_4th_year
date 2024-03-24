package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.FeedBack;
import com.esprit.pi_project.entities.StatusFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackDao extends JpaRepository<FeedBack,Integer> {
    List<FeedBack> findFeedBackByStatus(StatusFeedback statusFeedback);
}
