
package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Forum;
import com.esprit.pi_project.entities.ForumStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForumDao extends JpaRepository<Forum,Integer> {
    @Query("SELECT f FROM Forum f WHERE f.topic LIKE %:keyword% OR f.content LIKE %:keyword%")
    List<Forum> findByTopicContainingOrContentContaining(@Param("keyword") String keyword);
    @Query("SELECT f FROM Forum f WHERE f.status = :status")
    List<Forum> findForumByStatus(@Param("status") ForumStatus status);
    @Query(value = "SELECT f.topic,\n" +
            "       CASE \n" +
            "           WHEN COUNT(q.question_id) > 0 THEN\n" +
            "               (MAX(r.upvotes) * 100.0 / NULLIF(SUM(q.question_id), 0))\n" +
            "           ELSE\n" +
            "               0\n" +
            "       END AS bestAnswerPercentage\n" +
            "FROM Forum f\n" +
            "LEFT JOIN Question q ON f.forum_id = q.forum_id\n" +
            "LEFT JOIN Response r ON q.question_id = r.question_id\n" +
            "GROUP BY f.topic\n" +
            "ORDER BY bestAnswerPercentage DESC;",nativeQuery = true)
    List<Object[]> findForumWithBestAnswers();




    @Query("SELECT f.topic, COUNT(q.questionId), COUNT(r.responseId) \n" +
            "FROM Forum f \n" +
            "LEFT JOIN Question q ON q.forum.forumId = f.forumId \n" +
            "LEFT JOIN Response r ON r.question.questionId = q.questionId \n" +
            "GROUP BY f.topic \n")
    List<Object[]> findForumWithQuestionsAndResponses();

}

