package com.school.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school.entities.User;
import com.school.repository.UserRepository;

@RestController
@RequestMapping("/student")
public class studentController {
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/details/{id}")
	public User details(@PathVariable int id) {
		return userRepository.findById(id);
	}
	
}
