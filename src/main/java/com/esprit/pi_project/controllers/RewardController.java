package com.esprit.pi_project.controllers;

import com.esprit.pi_project.dao.RewardDao;
import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.services.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RewardController {
    @Autowired
    private RewardDao rewardDao;
    @Autowired
    private RewardService rewardService;

    @GetMapping("/getallrewards")
    public List<Reward> getallrewards(){
        return this.rewardService.findAll();
    }

    @GetMapping("/findrewardbyid/{id}")
    public Reward getrewardbyid(@PathVariable Integer id){
        return this.rewardService.findById(id);
    }

    @PostMapping("/addreward")
    public Reward addreward(@RequestBody Reward reward){
        return this.rewardService.newReward(reward);
    }

    @DeleteMapping("/deletreward")
    public void deletereward(@RequestBody Reward reward){
         this.rewardService.deleteReward(reward);
    }

    @PutMapping("/updatereward")
    public Reward updatereward(@RequestBody Reward reward){
        return this.rewardService.updateReward(reward);
    }



}
