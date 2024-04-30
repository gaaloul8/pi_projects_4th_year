package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Forum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForumDao extends JpaRepository<Forum,Integer> {
    @Query("SELECT f FROM Forum f WHERE f.topic LIKE %:keyword% OR f.content LIKE %:keyword%")
    List<Forum> findByTopicContainingOrContentContaining(@Param("keyword") String keyword);
}
