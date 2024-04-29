package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.QuizDao;
import com.esprit.pi_project.entities.Quiz;
import com.esprit.pi_project.services.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor

public class QuizServiceImpl implements QuizService {
    QuizDao quizDao;
    @Override
    public List<Quiz> getAll() {
        return quizDao.findAll();
    }

    @Override
    public List<Quiz> getAllAllowedToPublish() {
        return quizDao.getAllByPublication(true);
    }

    @Override
    public Quiz addQuiz(Quiz quiz) {
        return quizDao.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {


            Optional<Quiz> existingQuizOptional = quizDao.findById(quiz.getIdQuiz());
            if (existingQuizOptional.isPresent()) {
                Quiz existingQuiz = existingQuizOptional.get();

                existingQuiz.setDescription(quiz.getDescription());
                existingQuiz.setTitle(quiz.getTitle());
                existingQuiz.setType(quiz.getType());

                return quizDao.saveAndFlush(existingQuiz);
            } else {

                System.out.println("Le quiz avec l'ID " + quiz.getIdQuiz() + " n'existe pas.");
                return null;
            }
        }



    @Override
    public void removeQuiz(Quiz quiz) {
    quizDao.delete(quiz);
    }

    @Override
    public Quiz findById(Integer idQuiz) {
        if(idQuiz!=null){
            final Optional<Quiz> optionalQuiz =quizDao.findById(idQuiz);
            if(optionalQuiz.isPresent()){
                return optionalQuiz.get();
            }
        }
        return  null;
    }

    @Override
    public Quiz publishQuiz(Quiz quiz) {

        Optional<Quiz> existingQuizOptional = quizDao.findById(quiz.getIdQuiz());
        if (existingQuizOptional.isPresent()) {
            Quiz existingQuiz = existingQuizOptional.get();

            existingQuiz.setDescription(quiz.getDescription());
            existingQuiz.setTitle(quiz.getTitle());
            existingQuiz.setType(quiz.getType());
            existingQuiz.setPublication(true);

            return quizDao.saveAndFlush(existingQuiz);
        } else {

            System.out.println("Le quiz avec l'ID " + quiz.getIdQuiz() + " n'existe pas.");
            return null;
        }
    }

    @Override
    public Quiz unpublishQuiz(Quiz quiz) {
        Optional<Quiz> existingQuizOptional = quizDao.findById(quiz.getIdQuiz());
        if (existingQuizOptional.isPresent()) {
            Quiz existingQuiz = existingQuizOptional.get();

            existingQuiz.setDescription(quiz.getDescription());
            existingQuiz.setTitle(quiz.getTitle());
            existingQuiz.setType(quiz.getType());
            existingQuiz.setPublication(false);

            return quizDao.saveAndFlush(existingQuiz);
        } else {

            System.out.println("Le quiz avec l'ID " + quiz.getIdQuiz() + " n'existe pas.");
            return null;
        }
    }
}
