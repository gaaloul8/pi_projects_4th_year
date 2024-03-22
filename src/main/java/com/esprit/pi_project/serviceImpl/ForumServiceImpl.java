package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.ForumDao;
import com.esprit.pi_project.entities.Forum;
import com.esprit.pi_project.services.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ForumServiceImpl implements ForumService {
    @Autowired
    private ForumDao forumDao;
    @Override
    public Forum saveForum(Forum forum) {
        return forumDao.save(forum);
    }

    @Override
    public Forum updateForum(Forum forum) {
        return forumDao.save(forum);
    }

    @Override
    public void deleteForum(Integer forumId) {
            forumDao.deleteById(forumId);
    }

    @Override
    public Forum getForumById(Integer forumId) {
        Optional<Forum> optionalForum = forumDao.findById(forumId);
        return optionalForum.orElse(null);
    }

    @Override
    public List<Forum> getAllForums() {
        return forumDao.findAll();
    }
}
