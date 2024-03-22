package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponseDao extends JpaRepository<Response,Integer> {
}
