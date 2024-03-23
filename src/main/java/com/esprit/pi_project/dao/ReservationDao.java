package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

public interface ReservationDao extends JpaRepository<Reservation,Integer> {
}
