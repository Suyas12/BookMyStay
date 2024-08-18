package com.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.book.entities.Reviews;

@Repository
public interface ReviewRepository extends JpaRepository<Reviews, Long>{

}
