package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Reclamation;
import com.esprit.pi_project.entities.ReclamationStatus;

import java.util.List;

public interface IReclamationService {
    Reclamation createReclamation(Reclamation reclamation);
    Reclamation updateReclamation(int id, Reclamation reclamationDetails);
    List<Reclamation> getAllReclamations();
    Reclamation getReclamationById(int id);
    void deleteReclamation(int id);
    Reclamation updateReclamationStatus(int id, ReclamationStatus newStatus);
    void archiveReclamation(int id);


}
