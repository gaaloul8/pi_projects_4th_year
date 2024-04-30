
package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Reservation;

import java.util.List;

public interface ReservationService {
    Reservation addReservation (Integer idEvent,Reservation Reservation);
    //List<Reservation> findAll(int idUser);
    void deleteReservationByidR (Integer idR);
    List<Reservation> findAll();
    Reservation UpdateReservation (Reservation Reservation);

    Reservation findByIdReservation (Integer idR);
}
