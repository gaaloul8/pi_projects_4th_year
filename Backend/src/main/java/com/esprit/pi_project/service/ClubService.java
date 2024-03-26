package com.esprit.pi_project.service;

import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Tag;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ClubService {
    Club addClub(Club club);
    Club updateClub(Club club);
    void deleteClub(Long idClub);
    Club findClubById(Long idClub);
    List<Club> findAllClubs();
    List<Club> findByTag(Tag tag);

}
