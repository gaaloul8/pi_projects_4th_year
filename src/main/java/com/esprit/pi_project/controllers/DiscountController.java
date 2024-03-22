package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Discount;
import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Deque;
import java.util.List;

@RestController
public class DiscountController {
    @Autowired
    private DiscountService discountService;

    @GetMapping("/getalldiscounts")
    public List<Discount> getalldiscounts(){
        return this.discountService.getAll();
    }

    @GetMapping("/getDiscountbyid/{id}")
    public Discount getdiscountbyid(@PathVariable Integer id){
        return this.discountService.findById(id);

    }

    @PostMapping("/addDiscount")
    public Discount addDiscount(@RequestBody Discount discount){
        return this.discountService.newDiscount(discount);
    }

    @PutMapping("/updateDiscount")
    public Discount updateDiscount(@RequestBody Discount discount){
        return this.discountService.updateDiscount(discount);
    }

    @DeleteMapping("/deleteDiscount")
    public void deleteDisocunt(@RequestBody Discount discount){
        this.discountService.deleteDiscount(discount);
    }


    @PutMapping("/calculnewcost")
    public void calculnewcost(@RequestBody Discount discount){
        this.discountService.calculcostafterdiscount(discount);
    }



}
