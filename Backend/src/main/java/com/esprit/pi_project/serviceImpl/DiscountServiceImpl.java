package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.DiscountDao;
import com.esprit.pi_project.dao.RewardDao;
import com.esprit.pi_project.entities.Discount;
import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.services.DiscountService;
import com.esprit.pi_project.services.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DiscountServiceImpl implements DiscountService {
    @Autowired
    private DiscountDao discountDao;
    @Autowired
    private RewardDao rewardDao;
    @Autowired
    RewardService rewardService;
    @Override
    public List<Discount> getAll() {
        return discountDao.findAll();
    }

    @Override
    public Discount newDiscount(Discount discount) {
        if (!discount.getDiscountValue().endsWith("%")) {
            throw new IllegalArgumentException("Discount value must end with '%' symbol");
        }

        double discountPercentage = Double.parseDouble(discount.getDiscountValue().replace("%", ""));
        if (discountPercentage <= 0 || discountPercentage > 100) {
            throw new IllegalArgumentException("Discount percentage must be between 0 and 100");
        }

        if (discount.getCreatedDiscount().after(discount.getEndDiscount())) {
            throw new IllegalArgumentException("End date must be after start date");
        }

        return discountDao.save(discount);
    }



    @Override
    public void deleteDiscount(Integer id) {
         discountDao.deleteById(id);
    }

    @Override
    public Discount findById(Integer id) {
        if (id != null) {
            final Optional<Discount> optionalDiscount = discountDao.findById(id);
            if (optionalDiscount.isPresent()) {
                return optionalDiscount.get();
            }
        }
        return null;
    }

    @Override
    public Discount updateDiscount(Discount discount) {
        Optional<Discount> existingDiscount = discountDao.findById(discount.getIdDiscount());

        if (existingDiscount.isPresent()) {
            Discount existingd = existingDiscount.get();

            existingd.setDiscountValue(discount.getDiscountValue());
            existingd.setCreatedDiscount(discount.getCreatedDiscount());
            existingd.setEndDiscount(discount.getEndDiscount());
            existingd.setReward(discount.getReward());

            return discountDao.save(existingd);
        } else {

            return null;
        }
    }


    public void calculcostafterdiscount(Discount discount){
        Reward reward = discount.getReward(); // Retrieve the reward from the discount
        System.out.println("///////////////////////////////"+reward);
        if (reward != null && reward.getIdReward() != null){
            Reward existingReward = rewardService.findById(reward.getIdReward());
            if (existingReward != null) {
                String discountValueString = discount.getDiscountValue().replace("%", "");
                float discountValue = Float.parseFloat(discountValueString);
                System.out.println(discountValue);
                float discountAmount = (existingReward.getCost() * discountValue) / 100;
                float newCost = existingReward.getCost() - discountAmount;

                System.out.println(newCost);

                existingReward.setCost(newCost);
                rewardDao.save(existingReward);
            }
        }
    }





}
