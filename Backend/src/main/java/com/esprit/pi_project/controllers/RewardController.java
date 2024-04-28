package com.esprit.pi_project.controllers;

import com.esprit.pi_project.dao.RewardDao;
import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.entities.TransactionHistory;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.RewardService;
import com.esprit.pi_project.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/reward")
@CrossOrigin(origins = "*")
public class RewardController {
    @Autowired
    private RewardDao rewardDao;
    @Autowired
    private RewardService rewardService;
    @Autowired
    UserService userService;

    @GetMapping("/getallrewards")
    public List<Reward> getallrewards(){
        return  this.rewardService.findAll();
    }

    @GetMapping("/findrewardbyid/{id}")
    public Reward getrewardbyid(@PathVariable Integer id){
        return this.rewardService.findById(id);
    }

    @PostMapping("/addreward")
    public ResponseEntity<String> addreward(
        @RequestParam("image") MultipartFile image,
        @RequestParam("cost") float Cost ,
        @RequestParam("name")String name  ,
        @RequestParam("nbDispo")int nbDispo  ,
        @RequestParam("description")String description
            ,
        HttpServletRequest request
                )throws IOException {
         Optional<User> optionalUser = userService.getUserFromJwt(request);
         User user1 = optionalUser.get();
        System.out.println("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"+user1);
        try {
            rewardService.newReward(image, Cost, name, nbDispo, description,user1);
            return new ResponseEntity<>("Reward addes with success", HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("not succesfull ");
        }
    }



    @DeleteMapping("/deletreward/{id}")
    public ResponseEntity <Void> deletereward(@PathVariable Integer id){
         rewardService.deleteReward(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @PutMapping("/updatereward/{rewardId}")
    public ResponseEntity<String> updateReward(
            @PathVariable("rewardId") Integer rewardId,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "cost", required = false) Float cost,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "nbDispo", required = false) Integer nbDispo,
            @RequestParam(value = "description", required = false) String description,
            HttpServletRequest request
    ) throws IOException {
        Optional<User> optionalUser = userService.getUserFromJwt(request);
        User user1 = optionalUser.get();

        try {
            Reward updatedReward = rewardService.updateReward(rewardId, image, cost, name, nbDispo, description, user1);
            if (updatedReward != null) {
                return new ResponseEntity<>("Reward updated successfully", HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reward not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update reward");
        }
    }


    @PostMapping("/buyreward/{id}")
    public void purchaseReward(@PathVariable Integer id, HttpServletRequest request) {
        Optional<User> optionalUser = userService.getUserFromJwt(request);
        if (optionalUser.isPresent()) {
            User user1 = optionalUser.get();
            this.rewardService.purchaseReward(id, user1);
        } else {
            // Handle the case where no user is authenticated
            throw new RuntimeException("User not authenticated");
        }
    }


    @GetMapping("/statstics")
    public Map<String,Object> getstatistics(){
        return this.rewardService.calculateUserStatistics();
    }


    @GetMapping("/withdisoucnt")
    public List<Reward>rewardwithdiscount(){
        return this.rewardService.findrewardWithDiscount();
    }

    @GetMapping("/withnodisoucnt")
    public List<Reward>rewardwithnodiscount(){
        return this.rewardService.findrewardWithNoDiscount();
    }
    @GetMapping("/getalltransactions")
    public List<TransactionHistory>getalltransactions(){
        return this.rewardService.getalltransactions();
    }

        @GetMapping("/monthly-count")
        public Map<Integer, Long> getMonthlyTransactionCounts() {
            return rewardService.countTransactionsByMonth();
        }
    @GetMapping("/findrewardbyname/{name}")
    public Reward findrewardbyname(@PathVariable String name){
        return this.rewardService.findRewardByName(name);
    }

}
