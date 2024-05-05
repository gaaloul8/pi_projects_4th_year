package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.QuizUser;
import com.esprit.pi_project.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuizUserDao extends JpaRepository <QuizUser,Integer> {

    @Query("SELECT qu.participationDate, COUNT(qu) " +
            "FROM QuizUser qu " +
            "GROUP BY qu.participationDate")
    List<Object[]> getQuizUserParticipationDatesAndCounts();

  @Query("SELECT qu FROM QuizUser qu WHERE qu.quiz.idQuiz = :idQuiz AND qu.QuizUser = :user ORDER BY qu.idQuizUser DESC LIMIT 1")
   QuizUser findAllByQuizIdAndUser( Integer idQuiz,  User user);
    @Query("SELECT q.score FROM QuizUser q")
    List<String> findAllScores();

}
