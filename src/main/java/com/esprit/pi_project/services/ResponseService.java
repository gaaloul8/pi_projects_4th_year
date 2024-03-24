package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Response;

import java.util.List;

public interface ResponseService {
    Response saveResponse(Response response);

    Response updateResponse(Response response);

    void deleteResponse(Integer responseId);

    Response getResponseById(Integer responseId);

    List<Response> getAllResponses();
}
