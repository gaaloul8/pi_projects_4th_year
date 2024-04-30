package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountDao extends JpaRepository<Discount,Integer> {
}
