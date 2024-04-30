package com.esprit.pi_project.services;



import com.esprit.pi_project.entities.Activity;

import java.util.List;

public interface ActivityService {
    List<Activity> getAll();

    Activity addActivity (Activity activity, Integer idQuiz);
    Activity updateActivity (Activity activity);


    void removeActivity (Activity activity);

    Activity findById(Integer idActivity);
}
