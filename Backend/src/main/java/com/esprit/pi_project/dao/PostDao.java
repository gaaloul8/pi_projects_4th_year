package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Comment;
import com.esprit.pi_project.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface PostDao extends JpaRepository<Post,Long> {
   List<Post> findByPostDate(Date postDate);
    @Query(value = "SELECT MONTH(postDate) AS month, COUNT(*) AS postcount " +
            "FROM Post " +
            "GROUP BY MONTH(postDate)")
    List<Object[]> countPostsByMonth();
}
