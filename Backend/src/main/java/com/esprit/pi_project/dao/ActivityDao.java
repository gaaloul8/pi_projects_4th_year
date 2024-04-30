
package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityDao extends JpaRepository <Activity,Integer> {
    List<Activity> findByQuiz_IdQuiz(Integer idQuiz);
}
