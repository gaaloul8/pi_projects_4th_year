package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Tag;
import com.esprit.pi_project.entities.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface ClubService {
    Club addClub(MultipartFile imageFile, String clubName, String description, Integer membershipCount, String tag,User user) throws IOException;


    Club updateClub(Long clubId, String clubName, String description, Integer membershipCount, String tag, MultipartFile image, User user) throws IOException;

    void deleteClub(Long idClub);

    Club findClubById(Long idClub);

    List<Club> findAllClubs();

    List<Club> findByTag(Tag tag);



    void generateClubsPDF(HttpServletResponse response);

    Map<Tag, Long> countClubsByTag();

    List<Club> findClubsBySearchQuery(String query);
}






