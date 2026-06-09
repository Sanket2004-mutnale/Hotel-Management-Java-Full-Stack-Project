package com.Crown.CrownHotel.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Crown.CrownHotel.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	boolean existsByEmail(String email);
	
	Optional<User>findByEmail(String email);
}
