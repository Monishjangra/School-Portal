package com.school.service;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.school.entities.User;
import com.school.entities.UserRoles;
import com.school.repository.UserRepository;
import com.school.repository.RoleRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository RoleRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
//Add user
	public User CreateUser(User user, Set<UserRoles> userRoles) throws Exception {
		
		User localUser =userRepository.findByEmail(user.getEmail());
		if(localUser == null) {
			for (UserRoles userRole:userRoles) {
				RoleRepository.save(userRole.getRole());
			}
			user.getUserRoles().addAll(userRoles);
			user.setPassword(passwordEncoder.encode(user.getPassword()));	
			localUser = userRepository.save(user);
		}
		else {
			System.out.println("user already there");
			throw new Exception("user already there");
		}
		return localUser;
	}

//show user
	public User getUser(String email) {
		return userRepository.findByEmail(email);
	}
	
//delete user
	public String deleteUser(String email) {
		userRepository.deleteByEmail(email);
		return "deleted";
	}

//update user
	public User updateUser(User user, String email) {
		User dbuser=userRepository.findByEmail(email);
		dbuser.setFirstName(user.getFirstName());
		dbuser.setLastName(user.getLastName());
		dbuser.setEmail(user.getEmail());
		dbuser.setPassword(passwordEncoder.encode(user.getPassword()));
		
		return userRepository.save(dbuser);
	}
}
