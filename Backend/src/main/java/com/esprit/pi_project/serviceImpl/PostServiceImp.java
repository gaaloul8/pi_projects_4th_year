package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.PostDao;
import com.esprit.pi_project.entities.Comment;
import com.esprit.pi_project.entities.Forum;
import com.esprit.pi_project.entities.Post;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.PostService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PostServiceImp implements PostService {
    @Autowired
    private PostDao postDao;


    @Autowired
    private BadWordService badWordService;
    @Override
    public Post addPost(String content, MultipartFile imageFile, User user) throws IOException, ParseException {
        Date currentDateTime = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        String formattedDate = dateFormat.format(currentDateTime);
        Date parsedDate = dateFormat.parse(formattedDate);
        byte[] imageData = imageFile.getBytes(); // Read image data

        String base64Image = Base64.getEncoder().encodeToString(imageData);

        Post post = new Post();
        post.setUser(user);
        post.setImage(base64Image);
        post.setPostDate(parsedDate);
        post.setContent(content);
        post.setLikes(0);



            // Get the image file name with extension
           // String imageName = imageFile.getOriginalFilename();

            // Set the image name in the post object

        return postDao.save(post);


        // Save the post to the database




    }
    @Override
    public Post updatePost(Long postId,  String content, MultipartFile image,User user) throws IOException {
        Optional<Post> optionalReward = postDao.findById(postId);



        Post existingPost = optionalReward.get();

        // Check if image is provided
        if (image != null && !image.isEmpty()) {
            byte[] imageData = image.getBytes(); // Read image data
            String base64Image = Base64.getEncoder().encodeToString(imageData);
            existingPost.setImage(base64Image);
            existingPost.setUser(user);
        }

        // Update other fields if provided
        if (content != null) {
            existingPost.setContent(content);
        }



        // Save and return updated reward
        return postDao.save(existingPost);
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
    public Map<Integer, Long> countTransactionsByMonth() {
        List<Object[]> counts = postDao.countPostsByMonth();
        Map<Integer, Long> monthlyPosts = new HashMap<>();

        // Initialize all months with count 0
        for (int month = 1; month <= 12; month++) {
            monthlyPosts.put(month, 0L);
        }

        // Update counts for months with transactions
        for (Object[] row : counts) {
            int month = (int) row[0];
            long post = (long) row[1];
            monthlyPosts.put(month, post);
        }

        return monthlyPosts;
    }
    @Override
    public Post likePost(Long postId) {
        Post post = postDao.findById(postId).orElse(null);
        if (post != null) {
            post.setLikes(post.getLikes() + 1);
            return postDao.save(post);
        }
        return null;
    }

    @Override
    public Post dislikePost(Long postId) {
        Post post = postDao.findById(postId).orElse(null);
        if (post != null) {
            post.setLikes(post.getLikes() - 1);
            return postDao.save(post);
        }
        return null;
    }


}
