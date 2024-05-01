package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.UserDao;
import com.esprit.pi_project.entities.Reservation;
import com.esprit.pi_project.entities.Role;
import com.esprit.pi_project.entities.Tag;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.UserService;
import com.esprit.pi_project.services.jwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor


public class UserServiceIMPL implements UserService {
    @Autowired
    private UserDao userDao;
    private final jwtService jwtservice;


    @Override
    public List<User> getAll() {
        return userDao.findAll();
    }

    @Override
    public void deleteUser(User user) {
        userDao.delete(user);
    }

    @Override
    public User findById(Integer id) {
            if (id != null) {
                final Optional<User> User = userDao.findById(id);
                if (User.isPresent()) {
                    return User.get();
                }
        }
        return null;
    }

    @Override
    public User updateProfile(User user) {
        Optional<User> UserToupdate = userDao.findByEmail(user.getEmail());
    System.out.println(UserToupdate);
        if (UserToupdate.isPresent()) {
            User user3 = UserToupdate.get();


            user3.setRole(Role.ClubManager);


            return userDao.save(user3);
        } else {

            return null;
        }

    }


    @Override
    public User findByEmail(String email) {
        if (email != null) {
            final Optional<User> User = userDao.findByEmail(email);
            if (User.isPresent()) {
                return User.get();
            }
        }
        return null;
    }

    @Override
    public long getTotalUsers() {
        return userDao.count();
    }

    @Override
    public Map<String, Long> getUsersByLevel() {
        List<Object[]> results = userDao.countUsersByLevel();
        Map<String, Long> usersByLevel = new HashMap<>();
        for (Object[] result : results) {
            String level = (String) result[0];
            Long count = (Long) result[1];
            usersByLevel.put(level, count);
        }
        return usersByLevel;
    }

    @Override
    public int getTotalClubs() {
        return userDao.countByRole(Role.ClubManager);
    }


    public User CompletePorofile(Integer userId, List<Tag> tags, MultipartFile profilePicture, String niveau, String Identifiant) throws IOException {
        User user = userDao.findById(userId).orElse(null);
        if (user != null) {
            // Update user's tags, niveau, and Identifiant
            user.setTags(tags);
            user.setNiveau(niveau);
            user.setIdentifiant(Identifiant);
            user.setFirstLogin(false);

            byte[] imageData = profilePicture.getBytes(); // Read image data

            String base64Image = Base64.getEncoder().encodeToString(imageData);
            user.setProfilePicture(base64Image);


            return userDao.save(user);
        }
        return null; // Handle case where user is not found
    }
    public String getJwtFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7); // Removes "Bearer " prefix
        }
        return null;
    }

    public Optional<User> getUserFromJwt(HttpServletRequest request) {
        String jwt = getJwtFromRequest(request);
        if (jwt != null) {
            String email = jwtservice.extractemail(jwt);
            return userDao.findByEmail(email);
        }
        return Optional.empty();
    }


}


