package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Tag;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface ClubService {
     Club addClub(MultipartFile imageFile, String clubName, String description, Integer membershipCount, String tag) throws IOException;
     Club updateClub(Club club);
    void deleteClub(Long idClub);
    Club findClubById(Long idClub);
    List<Club> findAllClubs();
    List<Club> findByTag(Tag tag);
    List<Club> findAllByClubName(String clubName);
    void generateClubsPDF(HttpServletResponse response);
    Map<Tag, Long> countClubsByTag();

}
