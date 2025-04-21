package com.ecommerce.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.model.Account;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findByAccountId(int accountId);
    Optional<Account> findByUsername(String username);
    Optional<Account> findByRole(String role);
    boolean existsByUsername(String username);
}
