package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDao extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);
   Optional<User> findByResetToken(String Resettoken);

}
