package com.esprit.pi_project.service;

import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.FeedBack;
import com.esprit.pi_project.entities.StatusFeedback;

import java.util.List;

public interface FeedBackService {
    FeedBack addFeedBack (Integer idEvent, FeedBack feedBack);
    List<FeedBack> findAll();
    void deleteFeedBackByidFeedback (Integer idFeedback);

    FeedBack UpdateFeedBack (Integer idFeedback,FeedBack feedBack);

    FeedBack findByidFeedback (Integer idFeedback);

    List<FeedBack> searchFeedBackByStatus(StatusFeedback statusFeedback);
}
