package com.souldev.cart.security.respositories;

import java.util.Optional;

import com.souldev.cart.security.entities.Role;
import com.souldev.cart.security.enums.RoleList;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository <Role, Integer> {
    Optional<Role> findByRoleName(RoleList roleName);
    
}
