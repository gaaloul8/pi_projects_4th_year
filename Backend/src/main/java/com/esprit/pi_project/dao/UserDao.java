package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Reservation;
import com.esprit.pi_project.entities.Role;
import com.esprit.pi_project.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserDao extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);
   Optional<User> findByResetToken(String Resettoken);
    @Query("SELECT u.niveau, COUNT(u) FROM User u GROUP BY u.niveau")
    List<Object[]> countUsersByLevel();
    int countByRole(Role role);




}
