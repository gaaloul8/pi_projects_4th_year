package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.QuizOptionDao;
import com.esprit.pi_project.entities.QuizOption;
import com.esprit.pi_project.services.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OptionServiceImpl implements OptionService {
    @Autowired
    QuizOptionDao optionDao;
    @Override
    public void removeOption(QuizOption option ) {

        optionDao.delete(option);
    }
}
