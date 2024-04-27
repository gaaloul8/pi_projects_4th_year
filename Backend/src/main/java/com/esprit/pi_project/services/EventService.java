package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.TypeEvenement;

import java.util.Date;
import java.util.List;

public interface EventService {
   Evenement addEvent (Evenement evenement);
   List<Evenement> findAll();
   void deleteEvenementByidEvent (Integer idEvent);

   Evenement UpdateEvenement (Evenement evenement);

   Evenement findByEvenementidEvent (Integer idEvent);

   List<Evenement> searchEventByDate(Date date);

   List<Evenement> searchEventByTpe (TypeEvenement typeEvenement);

   List<Evenement> searchEventByName (String name);

   //List<Evenement> searchEventByMultiple(TypeEvenement typeM);

   List<Object[]> getEventFeedbackStatistics();


}
