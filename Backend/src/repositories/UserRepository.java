package com.esprit.pi_project.repositories;

import com.esprit.pi_project.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
