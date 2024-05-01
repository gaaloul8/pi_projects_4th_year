package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.EventDao;
import com.esprit.pi_project.dao.UserDao;
import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.EventWithRating;
import com.esprit.pi_project.entities.TypeEvenement;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.EventService;
import jakarta.annotation.Resource;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.Query;
import jdk.jfr.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class EventServiceImp implements EventService {

    @Resource
    @Autowired
    private EventDao eventDao;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UserDao userDao;

    @Override
    public Evenement addEvent(MultipartFile image,
                              String eventName,
                              String eventType,
                            Date datetime,
                              String location,
                              String description,
                              int nbplacesMax,
                              int tokenvalue,
                              User user

                              ) throws IOException{
        byte[] imageData = image.getBytes(); // Read image data
        Evenement event=new Evenement();
        TypeEvenement typeEvenement = TypeEvenement.valueOf(eventType);
        String base64Image = Base64.getEncoder().encodeToString(imageData);
        // System.out.println(base64Image);
        event.setImage(base64Image);
        event.setEventName(eventName);
        event.setEventType(typeEvenement);
        event.setDatetime(datetime);
        event.setLocation(location);
        event.setDescription(description);
        event.setNbplacesMax(nbplacesMax);
        event.setTokenvalue(tokenvalue);
        event.setEventOwner(user);

        return eventDao.save(event);


    }

    @Override
    public Evenement UpdateEvenement(Integer idEvent,
                                     MultipartFile image,
                                     String eventName,
                                     String eventType,
                                      Date datetime,
                                     String location,
                                     String description,
                                     int nbplacesMax,
                                     int tokenvalue,
                                     User user


    ) throws IOException{
        Optional<Evenement> optionalEvent = eventDao.findById(idEvent);
        TypeEvenement typeEvenement = TypeEvenement.valueOf(eventType);
        if (!optionalEvent.isPresent()) {
            // Handle the case where the reward with the specified ID is not found
            return null; // Or throw a custom exception
        }

        Evenement existingEvent = optionalEvent.get();

        // Check if image is provided
        if (image != null && !image.isEmpty()) {
            byte[] imageData = image.getBytes(); // Read image data
            String base64Image = Base64.getEncoder().encodeToString(imageData);
            existingEvent.setImage(base64Image);
        }

        // Update other fields if provided
     //   existingEvent.setDatetime(datetime);
        if (eventName != null) {
            existingEvent.setEventName(eventName);
        }
        if (description != null) {
            existingEvent.setDescription(description);
        }
        if (location != null) {
            existingEvent.setLocation(location);
        }
        if (eventType != null) {
            existingEvent.setEventType(typeEvenement);
        }

        if (nbplacesMax>= 0) {
            existingEvent.setNbplacesMax(nbplacesMax);
        }
        if (tokenvalue >= 0) {
            existingEvent.setTokenvalue(tokenvalue);
        }
        if (description != null) {
            existingEvent.setDescription(description);
        }

        if (user != null) {
            existingEvent.setEventOwner(user);
        }
        // Save and return updated reward
        return eventDao.save(existingEvent);
    }




    @Override
    public List<Evenement> findAll() {
        return eventDao.findAll();
    }

    public List<EventWithRating> getAllEventsWithRatings() {
        return eventDao.findAllWithRatings();
    }


    @Override
    public void deleteEvenementByidEvent(Integer idEvent) {
        Optional<Evenement> optionalEvenement = eventDao.findById(idEvent);
        if (optionalEvenement.isPresent()) {
            eventDao.deleteById(idEvent);
        } else {
            throw new EntityNotFoundException("L'événement avec l'ID " + idEvent + " n'existe pas.");
        }
    }



    @Override
    public Evenement findByEvenementidEvent(Integer idEvent) {
        if (idEvent != null) {
            final Optional<Evenement> optionalEvenement = eventDao.findById(idEvent);
            if (optionalEvenement.isPresent()){
                return optionalEvenement.get();
            }
        }
        return null;
    }

    @Override
    public List<Evenement> searchEventByDate(Date date) {
        return Collections.singletonList(eventDao.findByDatetime(date));
    }

    @Override
    public List<Evenement> searchEventByTpe(TypeEvenement typeEvenement) {
        return eventDao.findEvenementByEventType(typeEvenement);
    }

    @Override
    public List<Evenement> searchEventByName(String name) {
        return eventDao.findEvenementByEventName(name);
    }

    @Override
    public List<Object[]> getEventFeedbackStatistics() {
        String sql = "SELECT e.eventName, COUNT(f.idFeedback) AS feedbackCount " +
                "FROM Evenement e LEFT JOIN FeedBack f ON e.idEvent = f.evenement.idEvent " +
                "GROUP BY e.eventName";

        Query query = entityManager.createQuery(sql);
        return query.getResultList();
    }

@Override
    public void assignTokenToUser(Integer eventId, Integer userId) {
        // Récupérer l'événement
        Evenement event = eventDao.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with ID: " + eventId));

        // Récupérer l'utilisateur
        User user = userDao.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        // Affecter les tokens de l'événement à l'utilisateur
        int tokensToAdd = event.getTokenvalue();
        user.setTokenSolde(user.getTokenSolde() + tokensToAdd);

        System.out.println(userId);
        userDao.save(user);
        eventDao.save(event);

    }






}
