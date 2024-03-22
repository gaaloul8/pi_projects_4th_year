package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor

public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping()
    public User getUserById(@PathVariable Integer id){
        return this.userService.findById(id);

    }
    @PutMapping("/update")
    public User UpdateUserInfo(@RequestBody User user){
        return this.userService.updateProfile(user);
    }

}
