package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.ResponseDao;
import com.esprit.pi_project.entities.Response;
import com.esprit.pi_project.services.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
