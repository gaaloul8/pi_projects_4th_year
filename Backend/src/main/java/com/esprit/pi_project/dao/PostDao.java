package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Comment;
import com.esprit.pi_project.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Date;
import java.util.List;
public interface PostDao extends JpaRepository<Post,Long> {
    List<Post> findByPostDate(Date postDate);
}
