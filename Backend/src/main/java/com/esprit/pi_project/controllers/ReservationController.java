package com.esprit.pi_project.controllers;

import com.esprit.pi_project.dao.ReservationDao;
import com.esprit.pi_project.entities.Reservation;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.ReservationService;
import com.esprit.pi_project.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservation")
@CrossOrigin(origins = "*")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;
    @Autowired
    private ReservationDao reservationDao;
    @Autowired
    private UserService userService;


    @GetMapping("/getuser")
    public Optional<User> getconnecteduser(HttpServletRequest request){
        return this.userService.getUserFromJwt(request);
    }

    @PostMapping("/addReservation/{idEvent}")
    public ResponseEntity<Reservation> addReservation(@PathVariable Integer idEvent,
                                                      @RequestBody Reservation reservation,
                                                      HttpServletRequest request)throws IOException {

        Optional<User> optionalUser = userService.getUserFromJwt(request);
        User user= optionalUser.get();

        Reservation addedreservation = reservationService.addReservation(idEvent,reservation,user);
            return new ResponseEntity<>(addedreservation, HttpStatus.CREATED);}


    @DeleteMapping("/deleteReservation/{idR}")
    public void deleteReservationById(@PathVariable Integer idR){
        reservationService.deleteReservationByidR(idR);}

    @GetMapping("/getAllReservation")
    public List<Reservation> getAllReservation(){
        return reservationService.findAll();
    }

    @GetMapping("/getReservationByIdEvent/{idEvent}")
    public Reservation getReservationByIdEvent(@PathVariable Integer idEvent){
        return reservationService.getReservationByEventId(idEvent);
    }
    @GetMapping("/getuserandevent/{idEvent}/{idUser}")
    public Boolean getReservationByIdEvent(@PathVariable Integer idEvent,@PathVariable Integer idUser){
        return reservationDao.findIfUserExistsInReservation(idUser,idEvent);
    }


}
