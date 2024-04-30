package com.esprit.pi_project.controllers;


import com.esprit.pi_project.entities.QuizOption;
import com.esprit.pi_project.services.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("option")
public class OptionController {
    @Autowired
    OptionService optionService;

    @DeleteMapping("delete")
    @ResponseBody
    public void delete (@RequestBody QuizOption option ){
        optionService.removeOption(option);
    }
}
