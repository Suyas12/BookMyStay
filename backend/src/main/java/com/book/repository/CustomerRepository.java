package com.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.book.entities.Bookings;

@Repository
public interface CustomerRepository extends JpaRepository<Bookings, Long> {
}

