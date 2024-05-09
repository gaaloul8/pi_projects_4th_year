package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RewardDao extends JpaRepository<Reward,Integer> {
    @Query("SELECT r FROM Reward r WHERE r.idReward IN (SELECT d.reward.idReward FROM Discount d)")
    List<Reward> findRewardsWithDiscount();

    @Query("SELECT r FROM Reward r WHERE r.idReward NOT IN (SELECT d.reward.idReward FROM Discount d)")
    List<Reward> findRewardsWithNoDiscount();
    Reward findRewardByName(String name);
  //  List <Reward> findRewardByUser(User User);

}

