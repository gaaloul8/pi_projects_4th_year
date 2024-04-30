package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.QuestionDao;
import com.esprit.pi_project.entities.Question;
import com.esprit.pi_project.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionDao questionDao;

    @Override
    public Question saveQuestion(Question question) {
        return questionDao.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return questionDao.save(question);
    }

    @Override
    public void deleteQuestion(Integer questionId) {
        questionDao.deleteById(questionId);
    }

    @Override
    public Question getQuestionById(Integer questionId) {
        Optional<Question> optionalQuestion = questionDao.findById(questionId);
        return optionalQuestion.orElse(null);
    }

    @Override
    public List<Question> getAllQuestions() {
        return questionDao.findAll();
    }

    @Override
    public List<Question> searchQuestions(String keyword) {
        return questionDao.findByTitleContainingOrContentContaining(keyword);
    }

    @Override
    public Question upvoteQuestion(Integer questionId) {
        Question question = questionDao.findById(questionId).orElse(null);
        if (question != null) {
            question.setUpvotes(question.getUpvotes() + 1);
            return questionDao.save(question);
        }
        return null;
    }

    @Override
    public Question downvoteQuestion(Integer questionId) {
        Question question = questionDao.findById(questionId).orElse(null);
        if (question != null) {
            question.setUpvotes(question.getUpvotes() - 1);
            return questionDao.save(question);
        }
        return null;    }

    @Override
    public Question closeQuestion(Integer questionId) {
        Question question = questionDao.findById(questionId).orElse(null);
        if (question != null) {
            question.setClosed(true);
            return questionDao.save(question);
        }
        return null;
        }
}
