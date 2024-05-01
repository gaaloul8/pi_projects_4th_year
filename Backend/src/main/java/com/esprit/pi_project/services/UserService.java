package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Reservation;
import com.esprit.pi_project.entities.Tag;
import com.esprit.pi_project.entities.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UserService {
    List<User> getAll();

    void  deleteUser(User user);
    User findById(Integer id);
    User updateProfile (User user);
    User findByEmail(String email);
    public long getTotalUsers();
    public Map<String, Long> getUsersByLevel();
    public int getTotalClubs();
    User CompletePorofile(Integer userId, List<Tag> tags, MultipartFile profilePicture,String niveau,String Identifiant) throws IOException;
    String getJwtFromRequest(HttpServletRequest request);
    Optional<User> getUserFromJwt(HttpServletRequest request);


}
