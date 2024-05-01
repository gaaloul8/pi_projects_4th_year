package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.FeedBack;
import com.esprit.pi_project.entities.StatusFeedback;
import com.esprit.pi_project.entities.User;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface FeedBackService {
    FeedBack addFeedBack (Integer idEvent, FeedBack feedBack, User user);
   // List<FeedBack> findAll(int idUser);

    List<FeedBack> findAll();
    void deleteFeedBackByidFeedback (Integer idFeedback);

    FeedBack UpdateFeedBack (FeedBack feedBack,User user)throws IOException;

    FeedBack findByidFeedback (Integer idFeedback);

    List<FeedBack> searchFeedBackByStatus(StatusFeedback statusFeedback);

    Optional<Double> findAverageRatingByEventId(int eventId);

    List<FeedBack> getFeedbacksByEventId(Integer eventId);

    FeedBack analyzeSentimentAndSetStatus(FeedBack feedBack);

    public Map<String, Long> getFeedbackStatistics();
}
