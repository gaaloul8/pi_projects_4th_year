package com.esprit.pi_project.dao;


import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.TypeEvenement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface EventDao extends JpaRepository<Evenement,Integer> {
    Evenement findByDatetime(Date datetime);
    List<Evenement> findEvenementByEventType(TypeEvenement typeEvenement);

}
