package com.esprit.pi_project.dao;


import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.EventWithRating;
import com.esprit.pi_project.entities.TypeEvenement;
import jdk.jfr.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface EventDao extends JpaRepository<Evenement,Integer> {
    Evenement findByDatetime(Date datetime);
    List<Evenement> findEvenementByEventType(TypeEvenement typeEvenement);
    List<Evenement> findEvenementByEventName(String name);

    @Query("SELECT NEW com.esprit.pi_project.entities.EventWithRating(e.idEvent, e.eventName, e.eventType, e.datetime, e.location, e.description, e.image, e.nbplacesMax, e.nbPlacesReservees, e.tokenvalue, e.status, AVG(f.rating)) " +
            "FROM Evenement e " +
            "LEFT JOIN e.feedBacks f " +
            "GROUP BY e.idEvent")
    List<EventWithRating> findAllWithRatings();



}
