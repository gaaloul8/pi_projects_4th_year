package com.esprit.pi_project.services;


import com.esprit.pi_project.entities.Quiz;

import java.util.List;

public interface QuizService {
   List<Quiz> getAll();

    Quiz addQuiz (Quiz quiz);
    Quiz updateQuiz (Quiz quiz);


    void removeQuiz (Quiz quiz);

    Quiz findById(Integer idQuiz);
}
