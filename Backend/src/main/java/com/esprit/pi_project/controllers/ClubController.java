package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Tag;
import com.esprit.pi_project.services.ClubService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/clubs")
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")

public class ClubController {

    private ClubService clubService;
    @PostMapping("/add")
    public ResponseEntity<String> addClub(@RequestBody Club club){
         clubService.addClub(club);
        return new ResponseEntity<>("Club added successfully"
                , HttpStatus.CREATED);
    }
    @PutMapping("/update")
    public ResponseEntity<String> updateClub(@RequestBody Club club){
         clubService.updateClub(club);
        return new ResponseEntity<>("Club updated successfully"
                ,HttpStatus.OK);
    }
    @GetMapping("")
    public ResponseEntity<List<Club>> getAllClubs(){
         return new ResponseEntity<>(clubService.findAllClubs(),HttpStatus.OK) ;
    }
    @GetMapping("/{id}")
    public ResponseEntity<Club> getClubById(@PathVariable Long id){
        return new ResponseEntity<>(clubService.findClubById(id),HttpStatus.OK) ;  }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClub(@PathVariable Long id){
        clubService.deleteClub(id);
        return  ResponseEntity.ok("Club deleted successfully");
    }
    @GetMapping("/getByTag/{tag}")
    public List<Club> getClubByTag(@PathVariable Tag tag){
        return clubService.findByTag(tag);



}
    @GetMapping("/getByName/{clubName}")
    public List<Club> getClubByName(@PathVariable String clubName){
        return clubService.findAllByClubName(clubName);}
    @GetMapping("/generate-pdf")
    public void generatePDF(HttpServletResponse response) {
        response.setContentType("application/pdf");
        DateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd:hh:mm:ss");
        String currentDateTime=dateFormat.format((new Date()));

        clubService.generateClubsPDF(response);}
    @GetMapping("/tag-statistics")
    public Map<String, Long> getClubTagStatistics() {
        return clubService.countClubsByTag();
    }

}
