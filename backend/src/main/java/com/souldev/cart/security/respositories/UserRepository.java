package com.souldev.cart.security.respositories;

import java.util.Optional;

import com.souldev.cart.security.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends
        JpaRepository<User, String> {
    Optional<User> findByUserName(String userName);
    boolean existsByUserName(String userName);
    
}
