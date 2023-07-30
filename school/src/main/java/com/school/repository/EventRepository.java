package com.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.school.entities.*;


@Repository
public interface EventRepository extends JpaRepository<Events, Long> {

	//Events create(Events events);
	public  List<Events> findAll();
	 Events findByOptions(String options);
	
	
	}
