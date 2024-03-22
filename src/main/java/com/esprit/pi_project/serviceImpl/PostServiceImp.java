package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.PostDao;
import com.esprit.pi_project.entities.Comment;
import com.esprit.pi_project.entities.Post;
import com.esprit.pi_project.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImp implements PostService {
    @Autowired
    private PostDao postDao;
    @Override
    public Post addPost(Post post) {
        return postDao.save(post);
    }

    @Override
    public Post updatePost(Post post) {
        return postDao.save(post);
    }

    @Override
    public void deletePost(Long idPost) {
        postDao.deleteById(idPost);

    }

    @Override
    public Post findPostById(Long idPost) {
        return postDao.findById(idPost).get();
    }

    @Override
    public List<Post> findAllPost() {
        return postDao.findAll();
    }
}
