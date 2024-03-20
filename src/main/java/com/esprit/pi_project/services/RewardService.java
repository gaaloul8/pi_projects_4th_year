package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Reward;

import java.util.List;

public interface RewardService {
    Reward newReward(Reward reward);
    Reward findById(Integer id);
    List<Reward> findAll();
    void  deleteReward(Reward reward);
    Reward updateReward(Reward reward);


}
