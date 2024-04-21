package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Reclamation;
import com.esprit.pi_project.entities.ReclamationStatus;
import com.esprit.pi_project.entities.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface IReclamationService {
    Reclamation createReclamation(Reclamation reclamation, MultipartFile imageFile) throws IOException;
    Reclamation updateReclamation(int id, Reclamation reclamationDetails);
    List<Reclamation> getAllReclamations();
    Reclamation getReclamationById(int id);
    void deleteReclamation(int id);
    Reclamation updateReclamationStatus(int id, ReclamationStatus newStatus);
    void archiveReclamation(int id);
    List<Reclamation> getAllReclamations(boolean includeArchived);
    Reclamation inProgressReclamation(int reclamationId);
    Reclamation resolveReclamation(int reclamationId);
    List<Reclamation> getReclamationsAssignedToUser(int userId);
    List<User> getAllManagers();
    Reclamation assignReclamationToManager(int reclamationId, int managerId);
    Map<String, Map<String, Long>> getReclamationStatistics();
    List<Reclamation> getReclamationsByUserId(int userId);
    List<Reclamation> searchReclamationsByTitle(String title);
    List<Reclamation> getNewestReclamations();
    List<Reclamation> getOldestReclamations();


}
