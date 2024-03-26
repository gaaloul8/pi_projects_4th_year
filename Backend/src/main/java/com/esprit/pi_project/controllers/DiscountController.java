package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Discount;
import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Deque;
import java.util.List;

@RestController
@RequestMapping("/discount")
public class DiscountController {
    @Autowired
    private DiscountService discountService;

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
    public ResponseEntity<Discount> addDiscount(@RequestBody Discount discount) {
        if (!discount.getDiscountValue().endsWith("%")) {
            return ResponseEntity.badRequest().body(null);
        }

        double discountPercentage;
        try {
            discountPercentage = Double.parseDouble(discount.getDiscountValue().replace("%", ""));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(null);
        }

        if (discountPercentage <= 0 || discountPercentage > 100) {
            return ResponseEntity.badRequest().body(null);
        }

        if (discount.getCreatedDiscount().after(discount.getEndDiscount())) {
            return ResponseEntity.badRequest().body(null);
        }

        Discount savedDiscount = discountService.newDiscount(discount);
        return ResponseEntity.ok(savedDiscount);
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
