package com.esprit.pi_project.controllers;


import com.esprit.pi_project.dao.ReclamationDao;
import com.esprit.pi_project.entities.ReclamationStatus;
import com.esprit.pi_project.entities.Role;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.serviceImpl.ReclamationService;
import com.esprit.pi_project.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import com.esprit.pi_project.entities.Reclamation;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/reclamations")
@AllArgsConstructor
@CrossOrigin("*")
public class ReclamationController {


    private ReclamationService reclamationService;
    private ReclamationDao reclamationRepository;
    @Autowired
    private UserService userService;

    // Create a new reclamation
    @PostMapping
    public Reclamation createReclamation(@RequestPart("reclamation") Reclamation reclamation,
                                         @RequestPart("image") MultipartFile image ,  HttpServletRequest request) throws IOException {
        return reclamationService.createReclamation(reclamation, image,request);
    }

    // Get all reclamations
    @GetMapping
    public List<Reclamation> getAllReclamations() {
        return reclamationService.getAllReclamations(false);
    }


    // Get all archived reclamations
    @GetMapping("/archived")
    public List<Reclamation> getAllArchivedReclamations() {
        return reclamationService.getAllReclamations(true);
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
    @PostMapping("/{id}/status")
    public Reclamation updateReclamationStatus(@PathVariable int id, @RequestBody ReclamationStatus newStatus) {
        return reclamationService.updateReclamationStatus(id, newStatus);
    }


    //Archive a reclamation
    @PatchMapping("/{id}/archive")
    public void archiveReclamation(@PathVariable int id) {
        reclamationService.archiveReclamation(id);
    }


    @GetMapping("/oldest")
    public List<Reclamation> getOldestReclamations() {
        return reclamationService.getOldestReclamations();
    }

    @GetMapping("/newest")
    public List<Reclamation> getNewestReclamations() {
        return reclamationService.getNewestReclamations();
    }

    @GetMapping("/search")
    public List<Reclamation> searchReclamationsByTitle(@RequestParam String title) {
        return reclamationService.searchReclamationsByTitle(title);
    }

    @GetMapping("/user/{userId}")
    public List<Reclamation> getReclamationsByUserId(@PathVariable(value = "userId") int userId) {
        return reclamationService.getReclamationsByUserId(userId);
    }

    @GetMapping("/statistics")
    public Map<String, Map<String, Long>> getReclamationStatistics() {
        return reclamationService.getReclamationStatistics();
    }

    @GetMapping("/managers")
    public List<User> getAllManagers() {
        return reclamationService.getAllManagers();
    }

    @PostMapping("/{reclamationId}/assign-manager/{managerId}")
    public Reclamation assignReclamationToManager(
            @PathVariable int reclamationId, @PathVariable int managerId) {
        return reclamationService.assignReclamationToManager(reclamationId, managerId);
    }

    // Endpoint to get reclamations assigned to a specific user
    @GetMapping("/assigned-to/{userId}")
    public List<Reclamation> getReclamationsAssignedToUser(@PathVariable int userId) {
        return reclamationService.getReclamationsAssignedToUser(userId);
    }

    @PostMapping("/{id}/resolve")
    public Reclamation resolveReclamation(@PathVariable int id) {
        return reclamationService.resolveReclamation(id);
    }
    @PostMapping("/{id}/progress")
    public Reclamation inprogressReclamation(@PathVariable int id) {
        return reclamationService.inProgressReclamation(id);
    }
    @GetMapping("/getconnecteduser")
    public Optional<User> getconnecteduser(HttpServletRequest request){
        return this.userService.getUserFromJwt(request);
    }
    @GetMapping("/weekly-count")
    public List<String> getWeeklyReclamationsCount() {
        return reclamationService.getUpcomingEventMessages();
    }

}

