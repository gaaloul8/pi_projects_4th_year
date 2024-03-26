package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Discount;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.util.List;

public interface DiscountService {
    List<Discount> getAll();
    Discount newDiscount(Discount discount);
    void  deleteDiscount(Discount discount);
    Discount findById(Integer id);
    Discount updateDiscount (Discount discount);
    public void calculcostafterdiscount(Discount discount);

}
