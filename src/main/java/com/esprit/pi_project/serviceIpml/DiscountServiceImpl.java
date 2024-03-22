package com.esprit.pi_project.serviceIpml;

import com.esprit.pi_project.dao.DiscountDao;
import com.esprit.pi_project.dao.RewardDao;
import com.esprit.pi_project.entities.Discount;
import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.services.DiscountService;
import com.esprit.pi_project.services.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            if (! discount.getDiscountValue().endsWith("%")){
                System.out.println("saisir une pourcentage");
                return null;
            }

            double discountPercentage = Double.parseDouble(discount.getDiscountValue().replace("%", ""));
            if (discountPercentage <= 0 || discountPercentage > 100) {
                System.out.println("Saisir un pourcentage valide entre 0 et 100");
                return null;
            }

        if (discount.getCreatedDiscount().after(discount.getEndDiscount())) {
            System.out.println("Saisir deux dates valides");
            return null;
        }
        //if (discount.getReward()==null){
          //  System.out.println("saisir le reward pour faire le discount");
           // return null;

        //}
        else {
            return discountDao.save(discount);
        }
    }


    @Override
    public void deleteDiscount(Discount discount) {
         discountDao.delete(discount);
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
            if (discount.getReward().getIdReward() != null){
                Reward reward=rewardService.findById(discount.getReward().getIdReward());
                if (reward!=null) {
                    String discountValueString = discount.getDiscountValue().replace("%", "");

                    float discountvalue = Float.parseFloat(discountValueString);
                    float newcost = (reward.getCost() * discountvalue) / 100;
                    reward.setCost(newcost);
                    rewardDao.save(reward);
                }
            }

    }







}
