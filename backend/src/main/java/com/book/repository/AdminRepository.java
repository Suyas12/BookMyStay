package com.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.book.entities.User;

@Repository
public interface AdminRepository extends JpaRepository<User, Long>{

}
