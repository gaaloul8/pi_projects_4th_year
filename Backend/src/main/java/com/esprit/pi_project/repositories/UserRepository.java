package com.esprit.pi_project.repositories;

import com.esprit.pi_project.entities.Role;
import com.esprit.pi_project.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByRole(Role role);

}
