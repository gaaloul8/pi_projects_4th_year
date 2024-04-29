package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.EventDao;
import com.esprit.pi_project.dao.FeedbackDao;
import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.FeedBack;
import com.esprit.pi_project.entities.StatusFeedback;
import com.esprit.pi_project.services.EventService;
import com.esprit.pi_project.services.FeedBackService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedBackServiceImp implements FeedBackService {
    @Resource
    @Autowired
    private FeedbackDao feedbackDao;

    @Resource
    @Autowired
    private EventService eventService;

    @Autowired
    private EventDao eventDao;
    @Override
    public FeedBack addFeedBack(Integer idEvent, FeedBack feedBack) {
        Optional<Evenement> evenementOptional = eventDao.findById(idEvent);
        feedBack.setStatus(StatusFeedback.Unprocessed);

        if (evenementOptional.isPresent()) {
            Evenement evenement = evenementOptional.get();
            feedBack.setEvenement(evenement);
            // Autres traitements si nécessaire
            return feedbackDao.save(feedBack);
        } else {
            throw new IllegalStateException("Événement non trouvé avec l'ID : " + idEvent);
        }
    }

    @Override
    public List<FeedBack> findAll() {
        return feedbackDao.findAll();
       /* List<FeedBack> allfeedBacks = feedbackDao.findAll();
        // Filtrer les réservations pour l'utilisateur spécifique
        List<FeedBack> feedbackForUser = new ArrayList<>();
        for (FeedBack feedback :  allfeedBacks ) {
            if (feedback.getUser() != null && feedback.getUser().getId_user() == idUser) {
                feedbackForUser.add(feedback);
            }
        }
        return feedbackForUser;*/
    }

    @Override
    public void deleteFeedBackByidFeedback(Integer idFeedback) {
        FeedBack feedback = feedbackDao.findById(idFeedback)
                .orElseThrow(() -> new IllegalArgumentException("Feedback not found with specified ID."));
        if (feedback.getStatus() == StatusFeedback.Processed) {
            feedbackDao.deleteById(idFeedback);
        } else {
            throw new IllegalStateException("You can only delete a processed feedback.");
        }
    }

    @Override
    public FeedBack UpdateFeedBack(FeedBack feedBack) {
        return feedbackDao.save(feedBack);
    }

    @Override
    public Optional<FeedBack> findByidFeedback(Integer idFeedback) {
        return feedbackDao.findById(idFeedback);
    }

    @Override
    public List<FeedBack> searchFeedBackByStatus(StatusFeedback statusFeedback) {
        return feedbackDao.findFeedBackByStatus(statusFeedback);
    }
}

