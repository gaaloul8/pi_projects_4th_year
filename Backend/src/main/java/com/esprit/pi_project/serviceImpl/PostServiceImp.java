package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.PostDao;
import com.esprit.pi_project.entities.Comment;
import com.esprit.pi_project.entities.Post;
import com.esprit.pi_project.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImp implements PostService {
    @Autowired
    private PostDao postDao;

    @Autowired
    private BadWordService badWordService;
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
        Optional<Post> postOptional = postDao.findById(idPost);
        return postOptional.orElse(null);


}

    @Override
    public List<Post> findAllPost() {
        return postDao.findAll();
    }

    @Override
    public List<Post> findByPostDate(Date postDate) {
        return postDao.findByPostDate(postDate);
    }
}
