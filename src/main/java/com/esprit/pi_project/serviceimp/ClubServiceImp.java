package com.esprit.pi_project.serviceimp;

import com.esprit.pi_project.dao.ClubDao;
import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Tag;
import com.esprit.pi_project.service.ClubService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.List;
@Service
@AllArgsConstructor
@Slf4j
public class ClubServiceImp implements ClubService {

    private ClubDao clubDao;
    @Override
    public Club addClub(Club club) {
        return clubDao.save(club);
    }

    @Override
    public Club updateClub(Club club) {
        return clubDao.save(club);
    }

    @Override
    public void deleteClub(Long idClub) {
        clubDao.deleteById(idClub);

    }

    @Override
    public Club findClubById(Long idClub) {
        return clubDao.findById(idClub).get();
    }

    @Override
    public List<Club> findAllClubs() {
        return clubDao.findAll();
    }

    @Override
    public List<Club> findByTag(Tag tag) {
        return clubDao.findAllByTag(tag);
    }



}
