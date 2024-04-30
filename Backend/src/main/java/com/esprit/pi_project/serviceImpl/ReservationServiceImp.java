
package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.EventDao;
import com.esprit.pi_project.dao.ReservationDao;
import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.Reservation;
import com.esprit.pi_project.entities.StatusEvent;
import com.esprit.pi_project.services.EventService;
import com.esprit.pi_project.services.ReservationService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ReservationServiceImp implements ReservationService {
    @Resource
    @Autowired
    private EventService eventService;

    @Resource
    @Autowired
    private ReservationDao reservationDao;
    @Autowired
    private EventDao eventDao;

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

    /*@Scheduled(fixedRate = 60000)
    public void updateEventStatus() {
        List<Evenement> events = eventDao.findAll();
        Date currentDate = new Date();

        System.out.println("Vérification des statuts des événements...");

        for (Evenement event : events) {
            if (event.getStatus() == StatusEvent.Available && event.getDatetime().before(currentDate)) {
                System.out.println("Événement ID: " + event.getIdEvent() + " est terminé. Mettre à jour le statut...");
                event.setStatus(StatusEvent.Finished);
                eventDao.save(event);
                System.out.println("Statut de l'événement ID: " + event.getIdEvent() + " mis à jour avec succès.");
            }
        }

        System.out.println("Vérification des statuts des événements terminée.");
    }
    */

    public List<Reservation> findAll() {
        return reservationDao.findAll();}


        // Récupérer toutes les réservations
      /*  List<Reservation> allReservations = reservationDao.findAll();

        // Filtrer les réservations pour l'utilisateur spécifique
        List<Reservation> reservationsForUser = new ArrayList<>();
        for (Reservation reservation : allReservations) {
            if (reservation.getUser() != null && reservation.getUser().getId_user() == idUser) {
                reservationsForUser.add(reservation);
            }
        }
        return reservationsForUser;*/



    @Override
    public Reservation UpdateReservation(Reservation Reservation) {
        return null;
    }
    @Override
    public Reservation findByIdReservation(Integer idR) {
        return null;
    }
}
