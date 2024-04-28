package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.RewardDao;
import com.esprit.pi_project.dao.UserDao;
import com.esprit.pi_project.dao.transactionHistoryDao;
import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.entities.TransactionHistory;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.RewardService;
import com.esprit.pi_project.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
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
    public Reward newReward( MultipartFile image,float cost,String name,int nbDispo,String description,User user) throws IOException  {

        byte[] imageData = image.getBytes(); // Read image data
        Reward reward=new Reward();
        String base64Image = Base64.getEncoder().encodeToString(imageData);
       // System.out.println(base64Image);
        reward.setImage(base64Image);
            reward.setCost(cost);
            reward.setName(name);
            reward.setDescription(description);
            reward.setNbDispo(nbDispo);
            reward.setUser(user);


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
    public Reward updateReward(Integer rewardId, MultipartFile image, Float cost, String name, int nbDispo, String description, User user) throws IOException {
        Optional<Reward> optionalReward = rewardDao.findById(rewardId);

        if (!optionalReward.isPresent()) {
            // Handle the case where the reward with the specified ID is not found
            return null; // Or throw a custom exception
        }

        Reward existingReward = optionalReward.get();

        // Check if image is provided
        if (image != null && !image.isEmpty()) {
            byte[] imageData = image.getBytes(); // Read image data
            String base64Image = Base64.getEncoder().encodeToString(imageData);
            existingReward.setImage(base64Image);
        }

        // Update other fields if provided
        if (cost != null) {
            existingReward.setCost(cost);
        }
        if (name != null) {
            existingReward.setName(name);
        }
        if (nbDispo >= 0) {
            existingReward.setNbDispo(nbDispo);
        }
        if (description != null) {
            existingReward.setDescription(description);
        }
        if (user != null) {
            existingReward.setUser(user);
        }

        // Save and return updated reward
        return rewardDao.save(existingReward);
    }


   /* @Override
    public Reward updateReward(Reward reward) {
        Optional<Reward> existingReward = rewardDao.findById(reward.getIdReward());

        if (existingReward.isPresent()) {
            Reward existingR = existingReward.get();

            existingR.setName(reward.getName());
            existingR.setCost(reward.getCost());
            existingR.setUser(reward.getUser());
            existingR.setDescription(reward.getDescription());
            existingR.setNbDispo(reward.getNbDispo());
            existingR.setImage((reward.getImage()));
            //existingR.setDiscount(reward.getDiscount());

            return rewardDao.save(existingR);
        } else {

            return null;
        }
    }



    */



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
    public Reward purchaseReward(Integer rewardId, User authenticatedUser) {
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
            transactionHistory.setImage(reward.getImage());
            transactionHistory.setUser(authenticatedUser); // Set the authenticated user

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
        long usersWithNoRewards =totalUsers - usersWithRewards ;
 

        statistics.put("totalUsers", totalUsers);
        statistics.put("usersWithRewards", usersWithRewards);
        statistics.put("usersWithNoRewards", usersWithNoRewards);

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

    @Override
    public List<TransactionHistory>getalltransactions(){
           return transactionHistoryDao.findAll();
    }

    public Map<Integer, Long> countTransactionsByMonth() {
        List<Object[]> counts = transactionHistoryDao.countTransactionsByMonth();
        Map<Integer, Long> monthlyCounts = new HashMap<>();

        // Initialize all months with count 0
        for (int month = 1; month <= 12; month++) {
            monthlyCounts.put(month, 0L);
        }

        // Update counts for months with transactions
        for (Object[] row : counts) {
            int month = (int) row[0];
            long count = (long) row[1];
            monthlyCounts.put(month, count);
        }

        return monthlyCounts;
    }

    @Override
    public Reward findRewardByName(String name) {
        return rewardDao.findRewardByName(name);
    }


}
