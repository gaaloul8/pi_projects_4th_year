package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface ReservationDao extends JpaRepository<Reservation,Integer> {
    @Query("select r from Reservation r where r.evenementR.idEvent = :idEvent")
    Reservation findByEvenementR(Integer idEvent);
    @Query("SELECT EXISTS (" +
            "    SELECT 1" +
            "    FROM Reservation r" +
            "    WHERE r.User.id_user =:iduser  AND r.evenementR.idEvent =:idEvent "+
            ") AS exists_check")
    Boolean findIfUserExistsInReservation(Integer iduser,Integer idEvent);
}
