
package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.ActivityDao;
import com.esprit.pi_project.dao.QuizDao;
import com.esprit.pi_project.entities.Activity;
import com.esprit.pi_project.entities.Quiz;
import com.esprit.pi_project.services.ActivityService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor

public class ActivityServiceImpl implements ActivityService {

    ActivityDao activityDao;
    QuizDao quizDao;
    @Override
    public List<Activity> getAll() {
       return activityDao.findAll();
    }

    @Override
    public Activity addActivity(Activity activity, Integer idQuiz) {

        Quiz quiz = quizDao.findById(idQuiz).orElseThrow(() ->
                new IllegalArgumentException("Quiz non trouvé avec l'ID : " + idQuiz));

        activity.setQuiz(quiz);
       Activity savedActivity = activityDao.save(activity);
        quiz.getActivities().add(savedActivity);
        quizDao.save(quiz);

        return savedActivity;
    }

    @Override
    public Activity updateActivity(Activity activity) {
        Optional<Activity> existingActivityOptional = activityDao.findById(activity.getIdActivity());
        if (existingActivityOptional.isPresent()) {
            Activity existingActivity = existingActivityOptional.get();

            existingActivity.setType(activity.getType());
            existingActivity.setTitle(activity.getTitle());
            existingActivity.setContent(activity.getContent());

            return activityDao.saveAndFlush(existingActivity);
        } else {

            System.out.println("Le quiz avec l'ID " + activity.getIdActivity() + " n'existe pas.");
            return null;
        }
    }

    @Override
    public void removeActivity(Activity activity) {
        activityDao.delete(activity);
    }

    @Override
    public Activity findById(Integer idActivity) {
        if(idActivity!=null){
            final Optional<Activity> optionalActivity =activityDao.findById(idActivity);
            if(optionalActivity.isPresent()){
                return optionalActivity.get();
            }
        }
        return  null;
    }

    @Override
    public List<Activity> getAllActivitiesByQuizId(Integer idQuiz) {
        return activityDao.findByQuiz_IdQuiz(idQuiz);
    }
}
