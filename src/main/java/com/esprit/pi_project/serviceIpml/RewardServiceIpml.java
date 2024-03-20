package com.esprit.pi_project.serviceIpml;

import com.esprit.pi_project.dao.RewardDao;
import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.services.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RewardServiceIpml implements RewardService {
    @Autowired
    private RewardDao rewardDao;
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
            existingR.setDiscount(reward.getDiscount());

            return rewardDao.save(existingR);
        } else {

            return null;
        }
    }


}
