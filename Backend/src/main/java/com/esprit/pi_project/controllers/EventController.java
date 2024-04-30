package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.TypeEvenement;
import com.esprit.pi_project.services.EventService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/getAllEvent")
    public List<Evenement> getAllEvent() {return eventService.findAll();}


    @GetMapping("/eventId/{idEvent}")
    public Evenement getEvenementById(@PathVariable Integer idEvent) {return eventService.findByEvenementidEvent(idEvent);}


    @PutMapping("/updateEvent")
    public Evenement updateEvent (@RequestBody Evenement evenement){ return eventService.UpdateEvenement(evenement);}

    @PostMapping("/addEvent")
    public  ResponseEntity<Evenement>  addEvent (@RequestBody Evenement evenement){
        try {
            Evenement savedEvent = eventService.addEvent(evenement);
            return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/events/{idEvent}")
    public ResponseEntity<String>  deleteEvent(@PathVariable Integer  idEvent) {
        try {
            eventService.deleteEvenementByidEvent(idEvent);
            return ResponseEntity.ok().build();
            // Renvoyer une réponse 200 OK si la suppression réussit
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            // Renvoyer un message d'erreur
        }
    }

    @GetMapping("/searchByDate/{date}")
    public List<Evenement> searchEventByDate (@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")Date date){
        return eventService.searchEventByDate(date);
    }

    @GetMapping("/searchByType/{type}")
    public List<Evenement> searchEventByType (@PathVariable TypeEvenement type)
    {
        return eventService.searchEventByTpe(type);
    }




}

