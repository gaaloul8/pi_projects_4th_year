package com.esprit.pi_project.controllers;

import com.esprit.pi_project.dao.RewardDao;
import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.entities.TransactionHistory;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reward")
@CrossOrigin(origins = "*")
public class RewardController {
    @Autowired
    private RewardDao rewardDao;
    @Autowired
    private RewardService rewardService;

    @GetMapping("/getallrewards")
    public ResponseEntity<List<Reward>> getallrewards(){
        List<Reward> rewards= this.rewardService.findAll();
        return new ResponseEntity<>(rewards, HttpStatus.OK);
    }

    @GetMapping("/findrewardbyid/{id}")
    public Reward getrewardbyid(@PathVariable Integer id){
        return this.rewardService.findById(id);
    }

    @PostMapping("/addreward")
    public ResponseEntity<Reward> addreward(@RequestBody Reward reward){

        Reward reward1= this.rewardService.newReward(reward);
            return new ResponseEntity<>(reward1, HttpStatus.CREATED);


    }

    @DeleteMapping("/deletreward/{id}")
    public ResponseEntity <Void> deletereward(@PathVariable Integer id){
         rewardService.deleteReward(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @PutMapping("/updatereward")
    public Reward updatereward(@RequestBody Reward reward){
        return this.rewardService.updateReward(reward);
    }


    @PostMapping("/buyreward/{id}")
    public void purchaseReward(@PathVariable Integer id ){
        this.rewardService.purchaseReward(id);
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


}
