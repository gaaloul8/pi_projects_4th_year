package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.EventDao;
import com.esprit.pi_project.dao.FeedbackDao;
import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.FeedBack;
import com.esprit.pi_project.entities.StatusFeedback;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.EventService;
import com.esprit.pi_project.services.FeedBackService;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.trees.Tree;
import jakarta.annotation.Resource;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.stanford.nlp.pipeline.*;
import edu.stanford.nlp.ling.*;
import edu.stanford.nlp.util.*;
import edu.stanford.nlp.sentiment.*;

import java.io.IOException;
import java.util.*;

import edu.stanford.nlp.neural.rnn.RNNCoreAnnotations;

import javax.management.Query;


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
    public FeedBack addFeedBack(Integer idEvent, FeedBack feedBack,User user) {
        Optional<Evenement> evenementOptional = eventDao.findById(idEvent);
       // feedBack.setStatus(StatusFeedback.Unprocessed);
        if (evenementOptional.isPresent()) {
            Evenement evenement = evenementOptional.get();
            feedBack.setEvenement(evenement);
            feedBack.setUser(user);
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

            feedbackDao.deleteById(idFeedback);

    }


    @Override
    public FeedBack UpdateFeedBack(FeedBack feedBack, User user) {
        Optional<FeedBack> optionalExistingFeedback = feedbackDao.findById(feedBack.getIdFeedback());
        if (optionalExistingFeedback.isPresent()) {
            FeedBack existingFeedback = optionalExistingFeedback.get();
            existingFeedback.setContent(feedBack.getContent());
            existingFeedback.setRating(feedBack.getRating());
            existingFeedback.setUser(user);
            return feedbackDao.save(existingFeedback);
        } else {
            throw new EntityNotFoundException("Feedback not found with ID: " + feedBack.getIdFeedback());
        }
    }



    @Override
    public FeedBack findByidFeedback(Integer idFeedback) {
        Optional<FeedBack> optionalForum = feedbackDao.findById(idFeedback);
        return optionalForum.orElse(null);

    }


    @Override
    public List<FeedBack> searchFeedBackByStatus(StatusFeedback statusFeedback) {
        return feedbackDao.findFeedBackByStatus(statusFeedback);
    }

    @Override
    public Optional<Double> findAverageRatingByEventId(int eventId) {
        return feedbackDao.findAverageRatingByEventId(eventId);
    }

    @Override
    public List<FeedBack> getFeedbacksByEventId(Integer eventId) {
        return feedbackDao.findByEvenementIdEvent(eventId);
    }



    @Override
    public FeedBack analyzeSentimentAndSetStatus(FeedBack feedBack) {
        String content = feedBack.getContent();
        Properties props = new Properties();
        props.setProperty("annotators", "tokenize, ssplit, parse, sentiment");
        StanfordCoreNLP pipeline = new StanfordCoreNLP(props);
        Annotation annotation = new Annotation(content);
        pipeline.annotate(annotation);
        List<CoreMap> sentences = annotation.get(CoreAnnotations.SentencesAnnotation.class);
        int totalSentences = sentences.size();
        int totalSentiments = 0;
        for (CoreMap sentence : sentences) {
            String sentiment = sentence.get(SentimentCoreAnnotations.SentimentClass.class);
            if (sentiment.equals("Positive") || sentiment.equals("Negative")) {
                totalSentiments++;
            }
        }
        double sentimentPercentage = (double) totalSentiments / totalSentences;
        if (sentimentPercentage >= 0.5) {
            feedBack.setStatus(StatusFeedback.Positive);
        } else {
            feedBack.setStatus(StatusFeedback.Negative);
        }

        System.out.println("Sentiment of feedback: " + feedBack.getStatus());
        return feedBack;
    }

    @Override
    public Map<String, Long> getFeedbackStatistics() {
        Map<String, Long> statistics = new HashMap<>();
        statistics.put("Positive", feedbackDao.countByStatus(StatusFeedback.Positive));
        statistics.put("Negative", feedbackDao.countByStatus(StatusFeedback.Negative));
        return statistics;
    }


}






