package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.FeedBack;
import com.esprit.pi_project.entities.StatusFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackDao extends JpaRepository<FeedBack,Integer> {
    List<FeedBack> findFeedBackByStatus(StatusFeedback statusFeedback);
    @Query("SELECT AVG(fb.rating) FROM FeedBack fb WHERE fb.evenement.idEvent = :eventId")
    Optional<Double> findAverageRatingByEventId(@Param("eventId") int eventId);
    List<FeedBack> findByEvenementIdEvent(Integer eventId);

    @Query("SELECT COUNT(f) FROM FeedBack f WHERE f.status = ?1")
    Long countByStatus(StatusFeedback status);
}
