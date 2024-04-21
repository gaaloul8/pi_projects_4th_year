package com.esprit.pi_project.repositories;

import com.esprit.pi_project.entities.Reclamation;
import com.esprit.pi_project.entities.ReclamationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ReclamationRepository extends JpaRepository<Reclamation, Integer> {
    List<Reclamation> findByIsArchivedFalse();

    List<Reclamation> findByIsArchivedTrue();

    List<Reclamation> findByTitleContainingIgnoreCase(String title);

    List<Reclamation> findByCreatedByIdAndIsArchivedFalse(int userId);
    Long countByStatus(ReclamationStatus status);
    @Query("SELECT r.status, FUNCTION('YEAR', r.createdAt), FUNCTION('MONTH', r.createdAt), COUNT(r) " +
            "FROM Reclamation r " +
            "GROUP BY r.status, FUNCTION('YEAR', r.createdAt), FUNCTION('MONTH', r.createdAt)")
    List<Object[]> countMonthlyReclamationsGroupedByStatus();

    List<Reclamation> findBySubmittedToId(int userId);

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

}
