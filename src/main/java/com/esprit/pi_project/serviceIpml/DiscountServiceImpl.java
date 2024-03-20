package com.esprit.pi_project.serviceIpml;

import com.esprit.pi_project.dao.DiscountDao;
import com.esprit.pi_project.entities.Discount;
import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.services.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiscountServiceImpl implements DiscountService {
    @Autowired
    private DiscountDao discountDao;
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
        } else {
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

            return discountDao.save(existingd);
        } else {

            return null;
        }
    }







}
