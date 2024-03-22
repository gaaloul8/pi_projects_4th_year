package com.esprit.pi_project.dao;

import com.esprit.pi_project.entities.TransactionHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface transactionHistoryDao extends JpaRepository<TransactionHistory,Integer> {
}
