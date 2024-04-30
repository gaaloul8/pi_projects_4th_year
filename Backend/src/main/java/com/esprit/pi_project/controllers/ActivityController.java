package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Activity;
import com.esprit.pi_project.entities.Quiz;
import com.esprit.pi_project.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("activity")
public class ActivityController {
    @Autowired
    ActivityService activityService;

    @PostMapping("/{id}/activity")
    public void addActivity(@RequestBody Activity activity, @PathVariable Integer id) {
        activityService.addActivity(activity,id);

    }
    @GetMapping("all")
    public List<Activity> retrieveAllActivities() {

        return activityService.getAll();
    }

    @PutMapping("update")
    @ResponseBody
    public Activity updateActivity (@RequestBody Activity activity){
        return  activityService.updateActivity(activity);
    }
    @GetMapping("getActivity/{idActivity}")
    public Activity findById(@PathVariable Integer idActivity) {

        return activityService.findById(idActivity);
    }
    @DeleteMapping("delete")
    @ResponseBody
    public void delete (@RequestBody Activity activity ){
        this.activityService.removeActivity(activity);
    }
}
