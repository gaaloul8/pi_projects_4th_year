package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.ResponseDao;
import com.esprit.pi_project.entities.Response;
import com.esprit.pi_project.services.ResponseService;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.ling.CoreLabel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.AbstractMap.SimpleEntry;
import java.util.stream.Collectors;

@Service
public class ResponseServiceImpl implements ResponseService {
    @Autowired
    private ResponseDao responseDao;
    @Override
    public Response saveResponse(Response response) {
        return responseDao.save(response);
    }

    @Override
    public Response updateResponse(Response response) {
        return responseDao.save(response);
    }

    @Override
    public void deleteResponse(Integer responseId) {
            responseDao.deleteById(responseId);
    }

    @Override
    public Response getResponseById(Integer responseId) {
        Optional<Response> optionalResponse = responseDao.findById(responseId);
        return optionalResponse.orElse(null);
    }

    @Override
    public List<Response> getAllResponses() {
        return responseDao.findAll();
    }

    @Override
    public Response reportResponse(Integer responseId) {
        Response response = getResponseById(responseId);
        if (response != null) {
            response.setReported(true);
            return responseDao.save(response);
        }else{
            return null;
        }
    }

    @Override
    public Response upvoteResponse(Integer responseId) {
        Response response = getResponseById(responseId);
        if (response != null) {
            response.setUpvotes(response.getUpvotes() + 1);
           return responseDao.save(response);
        }else return null;
    }

    @Override
    public Response downvoteResponse(Integer responseId) {
        Response response = getResponseById(responseId);
        if (response != null) {
            response.setUpvotes(response.getUpvotes() - 1);
            return responseDao.save(response);
        }else return null;
    }

    @Override
    public List<Response> getResponsesByQuestionId(Integer questionId) {
        return responseDao.findByQuestionQuestionId(questionId);
    }

    @Override
    public void updateResponseContent(Integer responseId, String newContent) {
        Response response = getResponseById(responseId);
        if (response != null) {
            response.setContent(newContent);
            responseDao.save(response);
        }
    }

    @Override
    public List<Response> getMostUpvotedResponses() {
        return responseDao.findTop10ByOrderByUpvotesDesc();
    }

    @Override
    public List<Response> getResponsesSinceLastVisit(Date lastVisitDate) {
        return responseDao.findByCreatedAtAfter(lastVisitDate);
    }

    @Override
    public List<Response> getResponsesByDateRange(Date startDate, Date endDate) {
        return responseDao.findByCreatedAtBetween(startDate, endDate);
    }



    private static double inverseDocumentFrequency(String word, String[] sentences) {
        int documentFrequency = 0;
        for (String sentence : sentences) {
            if (sentence.toLowerCase().contains(word.toLowerCase())) {
                documentFrequency++;
            }
        }
        return Math.log((double) sentences.length / (documentFrequency + 1)); // Add 1 to avoid division by zero
    }

}
