
package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Discount;
import com.esprit.pi_project.entities.Evenement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface DiscountDao extends JpaRepository<Discount,Integer> {

}
