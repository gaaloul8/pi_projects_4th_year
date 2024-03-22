package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.RewardDao;
import com.esprit.pi_project.dao.transactionHistoryDao;
import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.entities.TransactionHistory;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.RewardService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RewardServiceIpml implements RewardService {
    @Autowired
    private RewardDao rewardDao;
    @Autowired
    private transactionHistoryDao transactionHistoryDao;

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
    public void deleteReward(Reward reward) {
        rewardDao.delete(reward);

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
       public Reward purchaseReward(Integer rewardId, User user) {
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
               transactionHistory.setUser(user);
               transactionHistoryDao.save(transactionHistory);

               return reward;
           } else {
               throw new RuntimeException("Reward not available or does not exist!");
           }
       }


}
