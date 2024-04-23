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
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/getAllEvent")
    public List<Evenement> getAllEvent() {return eventService.findAll();}


    @GetMapping("/eventId/{idEvent}")
    public Evenement getEvenementById(@PathVariable Integer idEvent) {return eventService.findByEvenementidEvent(idEvent);}


    @PutMapping("/updateEvent")
    public Evenement updateEvent(@RequestBody Evenement evenement) {
        return eventService.UpdateEvenement(evenement);
    }



    @PostMapping("/addEvent")
    public  ResponseEntity<Evenement>  addEvent (@RequestBody Evenement evenement,
                                                 @RequestPart("image") MultipartFile image){
        try {
            Evenement savedEvent = eventService.addEvent(evenement);
            return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/{idEvent}")
    public ResponseEntity<Void>  deleteEvent(@PathVariable Integer  idEvent) {
        eventService.deleteEvenementByidEvent(idEvent);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);


    }

    @GetMapping("/searchByDate/{date}")
    public List<Evenement> searchEventByDate (@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")Date date){
        return eventService.searchEventByDate(date);
    }

    @GetMapping("/searchByType/{type}")
    public List<Evenement> searchEventByType (@PathVariable TypeEvenement type)
    {
        return eventService.searchEventByTpe(type);
    }
    @GetMapping("/searchByName/{name}")
    public List<Evenement> searchEventByName (@PathVariable String name)
    {
        return eventService.searchEventByName(name);
    }
    @GetMapping("/feedbackStatistics")
    public List<Object[]> getEventFeedbackStatistics() {
        return eventService.getEventFeedbackStatistics();
    }




}

