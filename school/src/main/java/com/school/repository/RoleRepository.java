package com.school.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}
