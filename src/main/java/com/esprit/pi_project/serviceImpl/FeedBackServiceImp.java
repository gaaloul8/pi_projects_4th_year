package com.esprit.pi_project.serviceImp;

import com.esprit.pi_project.dao.FeedbackDao;
import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.FeedBack;
import com.esprit.pi_project.entities.StatusFeedback;
import com.esprit.pi_project.service.EventService;
import com.esprit.pi_project.service.FeedBackService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
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
    @Override
    public FeedBack addFeedBack(Integer idEvent,FeedBack feedBack) {
        Evenement evenement = eventService.findByEvenementidEvent(idEvent);

        // Initialiser le statut du feedback à "non traité"
        feedBack.setStatus(StatusFeedback.Unprocessed);

        Date eventDateTime = evenement.getDatetime();
        Date currentDateTime = new Date(); // Date actuelle
        // Vérification de la date et de l'heure de l'événement
        if (currentDateTime.after(eventDateTime)) {
            feedBack.setEvenement(evenement);
            return feedbackDao.save(feedBack);
        } else {
            throw new IllegalStateException("You cannot yet add feedback for this event.");
        }
    }

    @Override
    public List<FeedBack> findAll() {
        return feedbackDao.findAll();
    }

    public void deleteFeedBackByidFeedback(Integer idFeedback) {
        FeedBack feedback = feedbackDao.findById(idFeedback)
                .orElseThrow(() -> new IllegalArgumentException("Feedback not found with specified ID."));

        if (feedback.getStatus() == StatusFeedback.Processed) {
            feedbackDao.deleteById(idFeedback);
        } else {
            throw new IllegalStateException("You can only delete a processed feedback.");
        }
    }

    public FeedBack  UpdateFeedBack (Integer idFeedback, FeedBack updatedFeedback) {
        // Recherche du feedback par son ID
        Optional<FeedBack> existingFeedbackOptional = feedbackDao.findById(idFeedback);
        if (existingFeedbackOptional.isPresent()) {
            FeedBack existingFeedback = existingFeedbackOptional.get();
            // Vérification si le feedback est déjà traité
            if (existingFeedback.getStatus() == StatusFeedback.Unprocessed) {
                // Mettre à jour le contenu du feedback
                existingFeedback.setContent(updatedFeedback.getContent());
                // Enregistrer les modifications dans la base de données
                return feedbackDao.save(existingFeedback);
            }
        }
        // Si le feedback est déjà traité, retourner null avec un message d'erreur
        return null;

    }



    @Override
    public FeedBack findByidFeedback(Integer idFeedback) {
        return null;
    }

    @Override
    public List<FeedBack> searchFeedBackByStatus(StatusFeedback statusFeedback) {
        return feedbackDao.findFeedBackByStatus(statusFeedback);
    }
}
