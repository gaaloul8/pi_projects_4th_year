package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.TransactionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface transactionHistoryDao extends JpaRepository<TransactionHistory,Integer> {
    @Query(value = "SELECT COUNT(DISTINCT id_user) FROM transaction_history", nativeQuery = true)
    Integer nbactiveusers();

}
