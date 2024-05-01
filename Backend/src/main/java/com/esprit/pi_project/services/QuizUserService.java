package com.esprit.pi_project.services;



import com.esprit.pi_project.entities.QuizUser;
import com.esprit.pi_project.entities.User;

import java.util.List;

public interface QuizUserService {

    QuizUser ajouterQuizAUser (QuizUser quizUser, Integer idQuiz);

    List<QuizUser> getAll();
    public List<Object[]> getQuizUserParticipationDatesAndCounts();

   public  QuizUser getALLPartication(Integer idQuiz , User user );


}
