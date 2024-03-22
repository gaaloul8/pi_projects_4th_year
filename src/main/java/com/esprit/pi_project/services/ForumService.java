package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Forum;

import java.util.List;

public interface ForumService {
    Forum saveForum(Forum forum);

    Forum updateForum(Forum forum);

    void deleteForum(Integer forumId);

    Forum getForumById(Integer forumId);

    List<Forum> getAllForums();
}
