package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.QuizUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuizUserDao extends JpaRepository <QuizUser,Integer> {

    @Query("SELECT qu.participationDate, COUNT(qu) " +
            "FROM QuizUser qu " +
            "GROUP BY qu.participationDate")
    List<Object[]> getQuizUserParticipationDatesAndCounts();
}
