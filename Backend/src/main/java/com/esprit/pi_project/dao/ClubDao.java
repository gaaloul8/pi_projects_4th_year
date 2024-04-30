
package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Club;

import com.esprit.pi_project.entities.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Map;


public interface ClubDao extends JpaRepository<Club,Long> {
    List<Club> findAllByTag(Tag tag);
    List<Club> findAllByClubName(String clubName);
//    @Query("SELECT c.tag, COUNT(c) FROM Club c GROUP BY c.tag")
//    Map<Tag, Long> countClubsByTag();

}

