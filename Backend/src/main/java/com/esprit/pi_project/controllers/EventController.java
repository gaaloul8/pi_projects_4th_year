package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.*;
import com.esprit.pi_project.services.EventService;
import com.esprit.pi_project.services.ReservationService;
import com.esprit.pi_project.services.UserService;
import com.esprit.pi_project.utilities.QRCodeGenerator;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.ui.Model;
import org.springframework.web.servlet.view.RedirectView;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "*")
public class EventController {
    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/getuser")
    public Optional<User> getconnecteduser(HttpServletRequest request){
        return this.userService.getUserFromJwt(request);
    }

    @GetMapping("/getAllEvent")
    public ResponseEntity<List<Evenement>> getEvent() throws IOException, WriterException {
        List<Evenement> events = eventService.findAll();
        if (events.size() != 0){
            for (Evenement event : events){
                QRCodeGenerator.generateQRCode(event);
            }
        }
        return ResponseEntity.ok(eventService.findAll());
    }

    @GetMapping("/eventId/{idEvent}")
    public Evenement getEvenementById(@PathVariable Integer idEvent) {return eventService.findByEvenementidEvent(idEvent);}


    @PutMapping("/updateEvent/{idEvent}")
    public ResponseEntity<String> updateEvent(
            @PathVariable Integer idEvent,
            @RequestParam("eventType") String eventType,
            @RequestParam("eventName") String eventName,
           @RequestParam("datetime") @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX") Date datetime,
            @RequestParam("location") String location,
            @RequestParam("description") String description,
            @RequestParam("nbplacesMax") int nbplacesMax,
            @RequestParam("tokenvalue") int tokenvalue,
            @RequestParam("image") MultipartFile image,
            HttpServletRequest request
    ) throws IOException {
        Optional<User> optionalUser = userService.getUserFromJwt(request);
        User user = optionalUser.get();

        try {
            Evenement updatedEvent = eventService.UpdateEvenement(idEvent,image,eventName,eventType,
              datetime,location,description,nbplacesMax,tokenvalue,user);
            if (updatedEvent!= null) {
                return new ResponseEntity<>("Event updated successfully", HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update event");
        }
    }



@PostMapping("/addEvent")
    public  ResponseEntity<String>  addEvent (@RequestParam("eventType") String eventType,
                                              @RequestParam("eventName") String eventName,
                                              @RequestParam("datetime") @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX") Date datetime,
                                              @RequestParam("location") String location,
                                              @RequestParam("description") String description,
                                              @RequestParam("nbplacesMax") int nbplacesMax,
                                              @RequestParam("tokenvalue") int tokenvalue,
                                              @RequestParam("image") MultipartFile image,
                                              HttpServletRequest request)throws IOException {

    Optional<User> optionalUser = userService.getUserFromJwt(request);
    User user= optionalUser.get();
        try {
            eventService.addEvent(image,eventName,eventType,datetime,location,description,nbplacesMax,tokenvalue,user);
            return new ResponseEntity<>("Event addes with success", HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("not succesfull ");
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



    @GetMapping("/with-ratings")
    public ResponseEntity<List<EventWithRating>> getAllEventsWithRatings() {
        List<EventWithRating> eventsWithRatings = eventService.getAllEventsWithRatings();
        return ResponseEntity.ok(eventsWithRatings);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/{eventId}/assign-token/{userId}")
    public ResponseEntity<String> assignTokenToUser(@PathVariable("eventId") Integer eventId,
                                                    @PathVariable("userId") Integer userId) {
        try {

            System.out.println("useerId"+userId);
            System.out.println("eventId"+eventId);
            // Récupérer la réservation concernée par l'ID de l'événement
            Reservation reservation = reservationService.getReservationByEventId(eventId);
            System.out.println("rrrr"+reservation);
            // Vérifier si la réservation existe
            if (reservation == null) {
                return ResponseEntity.notFound().build();
            }

            // Récupérer l'utilisateur associé à la réservation
            User user = reservation.getUser();
            System.out.println("uuu"+user);
            // Affecter les jetons à l'utilisateur
            eventService.assignTokenToUser(eventId, userId);

            return ResponseEntity.ok("Tokens assigned successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to assign tokens: " + e.getMessage());
        }
    }



}

