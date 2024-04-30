package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.entities.TransactionHistory;
import com.esprit.pi_project.entities.User;

import java.util.List;
import java.util.Map;

public interface RewardService {
    Reward newReward(Reward reward);
    Reward findById(Integer id);
    List<Reward> findAll();
    void  deleteReward(Integer id);
    Reward updateReward(Reward reward);

    Reward purchaseReward(Integer rewardId) ;
    public Map<String, Object> calculateUserStatistics();

    public List<Reward> findrewardWithDiscount();
    public List<Reward> findrewardWithNoDiscount();

    List<TransactionHistory>getalltransactions();
}
