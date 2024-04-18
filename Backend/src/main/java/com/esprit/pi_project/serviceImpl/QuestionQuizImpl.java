package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.QuestionQuizDao;
import com.esprit.pi_project.dao.QuizDao;

import com.esprit.pi_project.dao.QuizOptionDao;
import com.esprit.pi_project.entities.Quiz;
import com.esprit.pi_project.entities.QuizOption;
import com.esprit.pi_project.entities.QuizQuestion;
import com.esprit.pi_project.services.OptionService;
import com.esprit.pi_project.services.QuestionQuizService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class QuestionQuizImpl implements QuestionQuizService {
    QuizDao quizDao;
    QuestionQuizDao questionDao;
    QuizOptionDao quizOptionDao;
    OptionService optionService;
    @Override
    public List<QuizQuestion> getAll() {
        return questionDao.findAll();
    }

    @Override
    public List<QuizQuestion> getAllQuestionByQuizId(Integer idQuiz) {
        return questionDao.findByQuiz_IdQuiz(idQuiz);
    }

    @Override
    public QuizQuestion addQuestion(QuizQuestion question) {
        return null;
    }



    @Override
    public QuizQuestion updateQuestion(QuizQuestion question) {
        List<QuizOption> optionList = quizOptionDao.findAll();
        for (QuizOption option1 : optionList) {
            if (option1.getQuestion() == null) {

                optionService.removeOption(option1);
            }
        }
        Optional<QuizQuestion> existingQuestionOptional = questionDao.findById(question.getIdQuestion());
        if (existingQuestionOptional.isPresent()) {
            QuizQuestion existingQuestion = existingQuestionOptional.get();

            // Mettre à jour les propriétés de la question
            existingQuestion.setContent(question.getContent());

            // Charger les options persistantes à partir de la base de données
            Set<QuizOption> updatedOptions = new HashSet<>();
            for (QuizOption option : question.getOptions()) {
                // Vérifier si l'option existe déjà en base de données
                if (option.getIdOption() != null) {
                    QuizOption persistentOption = quizOptionDao.findById(option.getIdOption())
                            .orElseThrow(() -> new IllegalArgumentException("Option not found with ID: " + option.getIdOption()));
                    updatedOptions.add(persistentOption);
                } else {
                    // Si l'option n'existe pas en base de données, utiliser l'instance fournie
                    updatedOptions.add(option);
                }
            }

            // Supprimer les options qui ne sont plus associées à la question
            existingQuestion.getOptions().forEach(option -> {
                if (!updatedOptions.contains(option)) {
                    // Désaffecter l'option de la question
                    option.setQuestion(null);
                    // Supprimer l'option de la base de données
                    quizOptionDao.delete(option);
                }
            });

            // Mettre à jour les options de la question avec les nouvelles options
            existingQuestion.setOptions(new ArrayList<>(updatedOptions));

            // Enregistrer la question mise à jour dans la base de données
            return questionDao.saveAndFlush(existingQuestion);
        } else {
            System.out.println("La question avec l'ID " + question.getIdQuestion() + " n'existe pas.");
            return null;
        }
    }



    @Override
    public void removeQuestion(QuizQuestion quiz) {

        questionDao.delete(quiz);
    }

    @Override
    public QuizQuestion findById(Integer idQuestion) {
        return null;
    }


    public QuizQuestion ajouterQuestAQuiz(QuizQuestion question, Integer idQuiz) {
        Quiz quiz = quizDao.findById(idQuiz).orElseThrow(() ->
                new IllegalArgumentException("Quiz non trouvé avec l'ID : " + idQuiz));


        question.setQuiz(quiz);
        QuizQuestion savedQuestion = questionDao.save(question);


        List<QuizOption> options = question.getOptions();
        options.forEach(option -> option.setQuestion(savedQuestion));


        quizOptionDao.saveAll(options);


        quiz.getQuestions().add(savedQuestion);
        quizDao.save(quiz);

        return savedQuestion;
    }
}
