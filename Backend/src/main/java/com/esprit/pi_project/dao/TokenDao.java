package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.Token;
import com.esprit.pi_project.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenDao extends JpaRepository<Token, Integer> {
    @Query(value = """
      select t from Token t inner join User u
      on t.user.id_user = u.id_user\s
      where u.id_user = :userid and (t.expired = false or t.revoked = false)
      """)

    List<Token> findtokens(Integer userid);

    Optional<Token> findByToken(String token);
}
