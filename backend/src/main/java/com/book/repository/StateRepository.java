package com.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.book.entities.State;

@Repository
public interface StateRepository extends JpaRepository<State, String> {
    // Custom query methods (if needed) can be added here
}
