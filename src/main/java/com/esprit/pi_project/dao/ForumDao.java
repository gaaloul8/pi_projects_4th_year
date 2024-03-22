package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Forum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumDao extends JpaRepository<Forum,Integer> {
}
