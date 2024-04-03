package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Reclamation;
import com.esprit.pi_project.entities.ReclamationStatus;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.repositories.ReclamationRepository;
import com.esprit.pi_project.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class ReclamationService implements IReclamationService{
    private ReclamationRepository reclamationRepository;
    private UserRepository userRepository;
    @Override
    public Reclamation createReclamation(Reclamation reclamation) {
        User user = userRepository.findById(reclamation.getCreatedBy().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
       // Reclamation reclamationn = new Reclamation();
        reclamation.setCreatedBy(user);
        reclamation.setArchived(false);
        reclamation.setCreatedAt(new Date(System.currentTimeMillis()));
        return reclamationRepository.save(reclamation);
    }

    @Override
    public Reclamation updateReclamation(int id, Reclamation reclamationDetails) {
        Reclamation reclamation = reclamationRepository.findById(id).orElse(null);

        if (reclamation == null) {
            return null;
        }else {
            reclamation.setTitle(reclamationDetails.getTitle());
            reclamation.setDescription(reclamationDetails.getDescription());
            reclamation.setStatus(reclamationDetails.getStatus());
        }

        return reclamationRepository.save(reclamation);
    }

    @Override
    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAll();
    }

    @Override
    public Reclamation getReclamationById(int id) {
        return reclamationRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteReclamation(int id) {
        Reclamation reclamation = reclamationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reclamation not found with id " + id));
        reclamationRepository.delete(reclamation);
    }
    @Override
    public Reclamation updateReclamationStatus(int id, ReclamationStatus newStatus) {
        Reclamation reclamation = reclamationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reclamation not found with id " + id));

        reclamation.setStatus(newStatus);
        return reclamationRepository.save(reclamation);
    }

    @Override
    public void archiveReclamation(int id) {
        Reclamation reclamation = reclamationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reclamation not found with id " + id));

        reclamation.setArchived(true);
        reclamationRepository.save(reclamation);
    }
    public List<Reclamation> getAllReclamations(boolean includeArchived) {
        if (includeArchived) {
            return reclamationRepository.findByIsArchivedTrue();
        } else {
            return reclamationRepository.findByIsArchivedFalse();
        }
    }


}
