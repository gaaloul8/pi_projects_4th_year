package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.ReservationDao;
import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.Reservation;
import com.esprit.pi_project.services.EventService;
import com.esprit.pi_project.services.ReservationService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationServiceImp implements ReservationService {
    @Resource
    @Autowired
    private EventService eventService;

    @Resource
    @Autowired
    private ReservationDao reservationDao;

    @Override
    public Reservation addReservation(Integer idEvent,Reservation reservation) {
        Evenement evenement = eventService.findByEvenementidEvent(idEvent);
        if (evenement == null) {
            throw new IllegalArgumentException("Événement non trouvé avec l'ID spécifié.");
        }

        // Vérifier si des places sont disponibles
        if (evenement.getNbPlacesReservees() < evenement.getNbplacesMax()) {
            // Incrémenter le nombre de places réservées
            evenement.setNbPlacesReservees(evenement.getNbPlacesReservees() + 1);
            // Enregistrer la réservation
            reservation.setEvenementR(evenement);
            return reservationDao.save(reservation);
        } else {
            throw new IllegalStateException("Impossible de réserver. Toutes les places sont déjà réservées.");
        }

    }
    @Override
    public void deleteReservationByidR(Integer idR) {
        Reservation reservation = reservationDao.findById(idR).orElse(null);

        if (reservation != null) {
            Evenement evenement = reservation.getEvenementR();

            // Vérifier si le nombre de places réservées est supérieur à zéro avant de décrémenter
            if (evenement.getNbPlacesReservees() > 0) {
                // Décrémenter le nombre de places réservées
                evenement.setNbPlacesReservees(evenement.getNbPlacesReservees() - 1);
            }
            // Supprimer la réservation
            reservationDao.deleteById(idR);
        }
    }



    @Override
    public List<Reservation> findAll() {
        return reservationDao.findAll();
    }
    @Override
    public Reservation UpdateReservation(Reservation Reservation) {
        return null;
    }
    @Override
    public Reservation findByIdReservation(Integer idR) {
        return null;
    }
}
