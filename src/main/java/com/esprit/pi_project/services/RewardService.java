package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.entities.User;

import java.util.List;

public interface RewardService {
    Reward newReward(Reward reward);
    Reward findById(Integer id);
    List<Reward> findAll();
    void  deleteReward(Reward reward);
    Reward updateReward(Reward reward);

    Reward purchaseReward(Integer rewardId, User user) ;


}
