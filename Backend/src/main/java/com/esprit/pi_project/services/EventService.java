package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.EventWithRating;
import com.esprit.pi_project.entities.TypeEvenement;
import com.esprit.pi_project.entities.User;
import jdk.jfr.Event;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

public interface EventService {
   Evenement addEvent (MultipartFile file,
                       String eventName,
                       String eventType,
                       Date datetime,
                       String location,
                       String description,
                       int nbplacesMax,
                       int tokenvalue,
                       User user
   )throws IOException;

   Evenement UpdateEvenement (Integer idEvent,
                              MultipartFile file,
                              String eventName,
                              String eventType,
                              Date datetime,
                              String location,
                              String description,
                              int nbplacesMax,
                              int tokenvalue,
                              User user

                              ) throws IOException;


   List<Evenement> findAll();

   List<EventWithRating> getAllEventsWithRatings();

   void deleteEvenementByidEvent (Integer idEvent);

   Evenement findByEvenementidEvent (Integer idEvent);

   List<Evenement> searchEventByDate(Date date);

   List<Evenement> searchEventByTpe (TypeEvenement typeEvenement);

   List<Evenement> searchEventByName (String name);

   //List<Evenement> searchEventByMultiple(TypeEvenement typeM);

   List<Object[]> getEventFeedbackStatistics();

   void assignTokenToUser(Integer eventId, Integer userId);


}
