package com.school.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	public User findById(int id);
	public User findByEmail(String email);
	public void deleteByEmail(String email);

}
