
package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.AuthService;
import com.esprit.pi_project.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    private final AuthService Service;

    @GetMapping("/getUsers")
    public List<User> getUser(){
        return  this.userService.getAll();
    }
    @GetMapping("/getuser/{id}")
    public User getUserbyId(@PathVariable Integer id){
        return this.userService.findById(id);

    }
    @DeleteMapping("/deleteuser/{id}")
    public void deleteUser(@PathVariable Integer id){
      User  UserToDelete=this.userService.findById(id);
        this.userService.deleteUser(UserToDelete);

    }

}

