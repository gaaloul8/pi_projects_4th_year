package com.esprit.pi_project.service;

import com.esprit.pi_project.entities.Reservation;

import java.util.List;

public interface ReservationService {
    Reservation addReservation (Integer idEvent,Reservation Reservation);
    List<Reservation> findAll();
    void deleteReservationByidR (Integer idR);

    Reservation UpdateReservation (Reservation Reservation);

    Reservation findByIdReservation (Integer idR);
}
