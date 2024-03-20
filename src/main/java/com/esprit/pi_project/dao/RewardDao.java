package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Reward;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RewardDao extends JpaRepository<Reward,Integer> {
}
