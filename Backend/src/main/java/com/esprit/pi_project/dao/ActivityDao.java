package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityDao extends JpaRepository <Activity,Integer> {
}
