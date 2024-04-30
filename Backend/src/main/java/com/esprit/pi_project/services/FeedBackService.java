
package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.FeedBack;
import com.esprit.pi_project.entities.StatusFeedback;

import java.util.List;
import java.util.Optional;

public interface FeedBackService {
    FeedBack addFeedBack (Integer idEvent, FeedBack feedBack);
   // List<FeedBack> findAll(int idUser);

    List<FeedBack> findAll();
    void deleteFeedBackByidFeedback (Integer idFeedback);

    FeedBack UpdateFeedBack (FeedBack feedBack);

    Optional<FeedBack> findByidFeedback (Integer idFeedback);

    List<FeedBack> searchFeedBackByStatus(StatusFeedback statusFeedback);
}
