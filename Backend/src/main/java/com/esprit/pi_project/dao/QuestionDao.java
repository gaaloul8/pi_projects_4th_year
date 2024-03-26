package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionDao extends JpaRepository<Question,Integer> {
    @Query("SELECT q FROM Question q WHERE q.title LIKE %:keyword% OR q.content LIKE %:keyword%")
    List<Question> findByTitleContainingOrContentContaining(@Param("keyword") String keyword);
}
