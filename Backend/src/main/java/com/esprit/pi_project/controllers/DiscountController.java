package com.esprit.pi_project.controllers;

import com.esprit.pi_project.dto.DiscountDTO;
import com.esprit.pi_project.entities.Discount;
import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.DiscountService;
import com.esprit.pi_project.services.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Deque;
import java.util.List;

@RestController
@RequestMapping("/discount")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
public class DiscountController {
    @Autowired
    private DiscountService discountService;
    @Autowired
    RewardService rewardService;
    @GetMapping("/getalldiscounts")
    public ResponseEntity<List<Discount>> getalldiscounts(){
    List<Discount> discounts= this.discountService.getAll();
        return new ResponseEntity<>(discounts, HttpStatus.OK);

    }

    @GetMapping("/getDiscountbyid/{id}")
    public Discount getdiscountbyid(@PathVariable Integer id){
        return this.discountService.findById(id);
    }

    @PostMapping("/addDiscount")
    public ResponseEntity<Discount> addDiscount(@RequestBody DiscountDTO discountDTO) {
        // Create a new Discount entity
        Discount discount = new Discount();
        //System.out.println("aaaaaaaaaaaaaaaaaaaaa");
        // Map fields from DTO to entity
        discount.setCreatedDiscount(discountDTO.getCreatedDiscount());
        discount.setEndDiscount(discountDTO.getEndDiscount());
        discount.setDiscountValue(discountDTO.getDiscountValue());

        // Fetch the corresponding reward by ID
        Reward reward = rewardService.findById(discountDTO.getRewardId());

        if (reward == null) {
            return ResponseEntity.badRequest().body(null); // Handle case where reward is not found
        }

        // Set the reward for the discount
        discount.setReward(reward);

        // Save the discount
        Discount savedDiscount = discountService.newDiscount(discount);

        // Return response
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDiscount);
    }


    @DeleteMapping("/deleteDiscount/{id}")
    public ResponseEntity<Void> deleteDisocunt(@PathVariable Integer id)
    {
        discountService.deleteDiscount(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }



    @PutMapping("/calculnewcost")
    public void calculnewcost(@RequestBody Discount discount){
        this.discountService.calculcostafterdiscount(discount);
    }

}
