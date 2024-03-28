package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.TransactionHistory;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface transactionHistoryDao extends JpaRepository<TransactionHistory,Integer> {
    @Query(value = "SELECT COUNT(DISTINCT user_id) FROM transaction_history", nativeQuery = true)
    Integer nbactiveusers();



}
