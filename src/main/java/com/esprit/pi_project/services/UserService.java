package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.User;

import java.util.List;

public interface UserService {
    List<User> getAll();

    void  deleteUser(User user);
    User findById(Integer id);
    User updateProfile (User user);
}
