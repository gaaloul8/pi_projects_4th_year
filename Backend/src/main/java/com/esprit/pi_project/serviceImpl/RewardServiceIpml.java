package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.RewardDao;
import com.esprit.pi_project.dao.UserDao;
import com.esprit.pi_project.dao.transactionHistoryDao;
import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.entities.TransactionHistory;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.RewardService;
import com.esprit.pi_project.services.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RewardServiceIpml implements RewardService {
    @Autowired
    private RewardDao rewardDao;
    @Autowired
    private transactionHistoryDao transactionHistoryDao;

    @Autowired
    private UserDao userDao;
    @Autowired
    UserService userService;

    @Override
    public Reward newReward(Reward reward) {
        return rewardDao.save(reward);
    }

    @Override
    public Reward findById(Integer id) {
        if (id != null) {
            final Optional<Reward> optionalReward = rewardDao.findById(id);
            if (optionalReward.isPresent()) {
                return optionalReward.get();
            }
        }
        return null;
    }

    @Override
    public List<Reward> findAll() {
        return rewardDao.findAll();
    }

    @Override
    public void deleteReward(Integer id) {
        rewardDao.deleteById(id);

    }

    @Override
    public Reward updateReward(Reward reward) {
        Optional<Reward> existingReward = rewardDao.findById(reward.getIdReward());

        if (existingReward.isPresent()) {
            Reward existingR = existingReward.get();

            existingR.setName(reward.getName());
            existingR.setCost(reward.getCost());
            existingR.setUser(reward.getUser());
            existingR.setDescription(reward.getDescription());
            existingR.setNbDispo(reward.getNbDispo());
            //existingR.setDiscount(reward.getDiscount());

            return rewardDao.save(existingR);
        } else {

            return null;
        }
    }





       /* public void buyreward(User user ,Reward reward){
            if (reward.getNbDispo()>0){

                if (user.getToken()< reward.getCost()){
                    //throw new Exception("token insufisant");
                    System.out.println("token insuffisant");

                 }else {
                user.setToken(user.getToken() - (int) reward.getCost());
                List<Reward> userRewards = user.getRewardList();
                userRewards.add(reward);
                reward.setUser(user);
                reward.setNbDispo(reward.getNbDispo() - 1);

            }
        }
    }

        */

       @Transactional
       public Reward purchaseReward(Integer rewardId) {
           Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
           String userEmail = authentication.getName(); // Get the email of the authenticated user
           User authenticatedUser = userService.findByEmail(userEmail);
           System.out.println("********************************");
           System.out.println(authenticatedUser);


           Reward reward = rewardDao.findById(rewardId).orElse(null);
           if (reward != null && reward.getNbDispo() > 0) {
               // Reduce the available count of the reward
               reward.setNbDispo(reward.getNbDispo() - 1);
               rewardDao.save(reward);


               // Create transaction history

               TransactionHistory transactionHistory = new TransactionHistory();
               transactionHistory.setReward(reward);
               transactionHistory.setPurchaseDate(new Date());
               transactionHistory.setPrice(reward.getCost());
               transactionHistory.setUser(authenticatedUser);
               transactionHistoryDao.save(transactionHistory);

               return reward;
           } else {
               throw new RuntimeException("Reward not available or does not exist!");
           }
       }




    @Override
    public Map<String, Object> calculateUserStatistics() {
        Map<String, Object> statistics = new HashMap<>();

        long totalUsers = userDao.count();
        long usersWithRewards = transactionHistoryDao.nbactiveusers();
        double averageRewardsPerUser = usersWithRewards / (double) totalUsers;

        statistics.put("totalUsers", totalUsers);
        statistics.put("usersWithRewards", usersWithRewards);
        statistics.put("averageRewardsPerUser", averageRewardsPerUser);

        return statistics;
    }



    @Override
    public List<Reward> findrewardWithDiscount(){
           return rewardDao.findRewardsWithDiscount();
    }
    @Override
    public List<Reward> findrewardWithNoDiscount(){
        return rewardDao.findRewardsWithNoDiscount();
    }


}
