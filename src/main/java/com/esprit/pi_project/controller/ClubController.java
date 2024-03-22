package com.esprit.pi_project.controller;

import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Tag;
import com.esprit.pi_project.response.HttpResponse;
import com.esprit.pi_project.service.ClubService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;


import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/clubs")
@AllArgsConstructor
@Slf4j

public class ClubController {

    private ClubService clubService;
    @PostMapping("/add")
    public Club addClub(@RequestBody Club club){
        return clubService.addClub(club);
    }
    @PutMapping("/update")
    public Club updateClub(@RequestBody Club club){
        return clubService.updateClub(club);
    }
    @GetMapping("")
    public List<Club> getAllClubs(){
        return  clubService.findAllClubs();
    }
    @GetMapping("/{id}")
    public Club getClubById(@PathVariable Long id){
        return clubService.findClubById(id);  }
    @DeleteMapping("/{id}")
    public void deleteClub(@PathVariable Long id){
        clubService.deleteClub(id);
    }
    @GetMapping("/getByTag/{tag}")
    public List<Club> getClubByTag(@PathVariable Tag tag){
        return clubService.findByTag(tag);


}}
