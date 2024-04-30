
package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.FeedBack;
import com.esprit.pi_project.entities.Reservation;
import com.esprit.pi_project.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
@CrossOrigin(origins = "*")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/addReservation/{idEvent}")
    public ResponseEntity<Reservation> addReservation(@PathVariable Integer idEvent, @RequestBody Reservation reservation)
    {   try {
        Reservation addedreservation = reservationService.addReservation(idEvent, reservation);
        return ResponseEntity.ok(addedreservation);
    } catch (IllegalStateException e) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    }

    @DeleteMapping("/deleteReservation/{idR}")
    public void deleteReservationById(@PathVariable Integer idR){
        reservationService.deleteReservationByidR(idR);}

    @GetMapping("/getAllReservation")
    public List<Reservation> getAllReservation(){
        return reservationService.findAll();
    }
}

