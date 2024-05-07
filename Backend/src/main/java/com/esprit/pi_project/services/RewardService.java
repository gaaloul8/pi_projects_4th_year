package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.entities.TransactionHistory;
import com.esprit.pi_project.entities.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface RewardService {
    Reward newReward( MultipartFile image, float cost, String name, int nbDispo, String description,User user) throws IOException;
    List<Reward> findAll();
    void  deleteReward(Integer id);
    Reward updateReward(Integer rewardId, MultipartFile image, Float cost, String name, int nbDispo, String description, User user) throws IOException;
    Reward purchaseReward(Integer rewardId,User authenticatedUser) ;
    public Map<String, Object> calculateUserStatistics();
    public List<Reward> findrewardWithDiscount();
    public List<Reward> findrewardWithNoDiscount();
    List<TransactionHistory>getalltransactions();
    Map<Integer, Long> countTransactionsByMonth();
    Reward findRewardByName(String name);
    Reward findById(Integer id);
     List<Reward> getrewardbyuser(User user);
     void updateReward(Integer idReward, int rate);
}
