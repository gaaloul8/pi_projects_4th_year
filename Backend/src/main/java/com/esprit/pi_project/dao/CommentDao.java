package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CommentDao extends JpaRepository<Comment,Long> {
     List<Comment> findAllByPostPostId(Long PostId) ;

}
