package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Reclamation;
import com.esprit.pi_project.entities.ReclamationStatus;
import com.esprit.pi_project.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReclamationDao extends JpaRepository<Reclamation, Integer> {
    List<Reclamation> findByIsArchivedFalse();

    List<Reclamation> findByIsArchivedTrue();

    List<Reclamation> findByTitleContainingIgnoreCase(String title);

    @Query("SELECT r FROM Reclamation r WHERE r.createdBy.id_user = :userId AND r.isArchived = false")
    List<Reclamation> findByCreatedById_userAndArchivedIsFalse(@Param("userId") Integer userId);
    Long countByStatus(ReclamationStatus status);
    @Query("SELECT r.status, FUNCTION('YEAR', r.createdAt), FUNCTION('MONTH', r.createdAt), COUNT(r) " +
            "FROM Reclamation r " +
            "GROUP BY r.status, FUNCTION('YEAR', r.createdAt), FUNCTION('MONTH', r.createdAt)")
    List<Object[]> countMonthlyReclamationsGroupedByStatus();

    @Query("SELECT r FROM Reclamation r WHERE r.submittedTo.id_user = :userId")
    List<Reclamation> findBySubmittedToId_user(@Param("userId") int userId);

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    List<Reclamation> findByCreatedBy(User u);


}
