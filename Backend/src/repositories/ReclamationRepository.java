package com.esprit.pi_project.repositories;

import com.esprit.pi_project.entities.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReclamationRepository extends JpaRepository<Reclamation, Integer> {
    List<Reclamation> findByIsArchivedFalse();

    List<Reclamation> findByIsArchivedTrue();

     List<Reclamation> findByTitleContainingIgnoreCase(String title);
}
