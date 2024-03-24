package com.esprit.pi_project.controllers;


import com.esprit.pi_project.entities.ReclamationStatus;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.esprit.pi_project.entities.Reclamation;
import com.esprit.pi_project.services.ReclamationService;

import java.util.List;

@RestController
@RequestMapping("/api/reclamations")
@AllArgsConstructor
public class ReclamationController {


    private ReclamationService reclamationService;

    // Create a new reclamation
    @PostMapping
    public Reclamation createReclamation(@RequestBody Reclamation reclamation) {
        return reclamationService.createReclamation(reclamation);
    }

    // Get all reclamations
    @GetMapping
    public List<Reclamation> getAllReclamations() {
        return reclamationService.getAllReclamations();
    }


    // Get a single reclamation by id
    @GetMapping("/{id}")
    public Reclamation getReclamationById(@PathVariable(value = "id") int reclamationId) {
        return reclamationService.getReclamationById(reclamationId);
    }

    // Update a reclamation
    @PutMapping("/{id}")
    public Reclamation updateReclamation(@PathVariable(value = "id") int reclamationId,
                                         @RequestBody Reclamation reclamationDetails) {
        return reclamationService.updateReclamation(reclamationId, reclamationDetails);
    }

    // Delete a reclamation
    @DeleteMapping("/{id}")
    public void deleteReclamation(@PathVariable(value = "id") int reclamationId) {
        reclamationService.deleteReclamation(reclamationId);
    }

    //Change Recalamtion Status
    @PostMapping("/reclamations/{id}/status")
    public Reclamation updateReclamationStatus(@PathVariable(value = "id") int reclamationId,
                                               @RequestBody ReclamationStatus newStatus) {
        return reclamationService.updateReclamationStatus(reclamationId, newStatus);
    }

    //Archive a reclamation
    @PatchMapping("/reclamations/{id}/archive")
    public void archiveReclamation(@PathVariable int id) {
         reclamationService.archiveReclamation(id);
    }


}
