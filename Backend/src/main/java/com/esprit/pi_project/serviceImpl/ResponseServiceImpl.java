package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.ResponseDao;
import com.esprit.pi_project.entities.Response;
import com.esprit.pi_project.services.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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
    public void reportResponse(Integer responseId) {
        Response response = getResponseById(responseId);
        if (response != null) {
            response.setReported(true);
            responseDao.save(response);
        }
    }

    @Override
    public void upvoteResponse(Integer responseId) {
        Response response = getResponseById(responseId);
        if (response != null) {
            response.setUpvotes(response.getUpvotes() + 1);
            responseDao.save(response);
        }
    }

    @Override
    public void downvoteResponse(Integer responseId) {
        Response response = getResponseById(responseId);
        if (response != null) {
            response.setUpvotes(response.getUpvotes() - 1);
            responseDao.save(response);
        }
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
}
