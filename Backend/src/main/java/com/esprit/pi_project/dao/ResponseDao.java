package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ResponseDao extends JpaRepository<Response,Integer> {
    @Query("SELECT r FROM Response r WHERE r.question.questionId = :questionId")
    List<Response> findByQuestionQuestionId(Integer questionId);

    @Query(value = "SELECT * FROM response ORDER BY upvotes DESC LIMIT 10", nativeQuery = true)
    List<Response> findTop10ByOrderByUpvotesDesc();

    @Query("SELECT r FROM Response r WHERE r.createdAt > :lastVisitDate")
    List<Response> findByCreatedAtAfter(Date lastVisitDate);

    @Query("SELECT r FROM Response r WHERE r.createdAt BETWEEN :startDate AND :endDate")
    List<Response> findByCreatedAtBetween(Date startDate, Date endDate);
}
