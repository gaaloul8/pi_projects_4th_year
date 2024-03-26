package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostDao extends JpaRepository<Post,Long> {
}
