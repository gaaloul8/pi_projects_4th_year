package com.esprit.pi_project.controllers;

import com.esprit.pi_project.dao.ClubDao;
import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Tag;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.ClubService;
import com.esprit.pi_project.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;


import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;


@RestController
@RequestMapping("/clubs")
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
public class ClubController {

    private ClubService clubService;
    private UserService userService;
    private ClubDao clubDao;
    @PostMapping("/add")
    public ResponseEntity<Club> addClub(@RequestParam("clubName") String clubName, @RequestParam("description") String description, @RequestParam("membershipCount") Integer membershipCount, @RequestParam("image") MultipartFile imageFile, HttpServletRequest request, @RequestParam("tag") String tag) throws IOException {

        System.out.println("Club Name: " + clubName); // Add this line to print clubName
        System.out.println("Description: " + description); // Add this line to print description
        System.out.println("Membership Count: " + membershipCount); // Add this line to print membershipCount
        System.out.println("Tag: " + tag); // Add this line to print tag
        Optional<User> optionalUser = userService.getUserFromJwt(request);
        User user1 = optionalUser.get();


        return new ResponseEntity<>(clubService.addClub(imageFile, clubName, description, membershipCount, tag,user1)
                , HttpStatus.CREATED);
    }

    @PutMapping("/updateclub/{clubId}")
    public ResponseEntity<Club> updateClub(@PathVariable("clubId") Long clubId,
                                           @RequestParam(value = "clubName", required = false) String clubName,
                                           @RequestParam(value = "description", required = false) String description,
                                           @RequestParam(value = "membershipCount", required = false) Integer membershipCount,
                                           @RequestParam(value = "tag", required = false) String tag,
                                           @RequestParam(value = "image", required = false) MultipartFile image,
                                           HttpServletRequest request) {
        try {
            Optional<User> optionalUser = userService.getUserFromJwt(request);
            User user1 = optionalUser.get();
            Club updatedClub = clubService.updateClub(clubId, clubName, description, membershipCount, tag, image,user1);
            if (updatedClub != null) {
                return new ResponseEntity<>(updatedClub, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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
        return clubDao.findAllByClubName(clubName);}
    @GetMapping("/generate-pdf")
    public void generatePDF(HttpServletResponse response) {
        response.setContentType("application/pdf");
        DateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd:hh:mm:ss");
        String currentDateTime=dateFormat.format((new Date()));

        clubService.generateClubsPDF(response);}
    @GetMapping("/search")
    public ResponseEntity<List<Club>> searchClubs(@RequestParam("query") String query) {
        List<Club> foundClubs = clubService.findClubsBySearchQuery(query);
        return ResponseEntity.ok(foundClubs);
    }
//    @GetMapping("/tag-statistics")
//    public Map<Tag, Long> getClubTagStatistics() {
//        return clubService.countClubsByTag();
//   }
@GetMapping("/tag-statistics")
public ResponseEntity<Map<Tag, Long>> getClubTagStatistics() {
    Map<Tag, Long> tagStatistics = clubService.countClubsByTag();
    return ResponseEntity.ok(tagStatistics);
}
    @GetMapping("/getconnecteduser")
    public Optional<User> getconnecteduser(HttpServletRequest request){
        return this.userService.getUserFromJwt(request);
    }


}
