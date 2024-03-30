package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;



public interface CommentDao extends JpaRepository<Comment,Long> {

}
