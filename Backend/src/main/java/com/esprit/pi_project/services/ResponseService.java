package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Response;

import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

public interface ResponseService {
    Response saveResponse(Response response) throws ParseException;

    Response updateResponse(Response response);

    void deleteResponse(Integer responseId);

    Response getResponseById(Integer responseId);

    List<Response> getAllResponses();

    Response reportResponse(Integer responseId);

    Response upvoteResponse(Integer responseId);

    Response downvoteResponse(Integer responseId);

    List<Response> getResponsesByQuestionId(Integer questionId);

    void updateResponseContent(Integer responseId, String newContent);

    List<Response> getMostUpvotedResponses();

    List<Response> getResponsesSinceLastVisit(Date lastVisitDate);

    List<Response> getResponsesByDateRange(Date startDate, Date endDate);
}
