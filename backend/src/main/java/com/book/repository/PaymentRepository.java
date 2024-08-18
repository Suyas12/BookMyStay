package com.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.book.entities.Payments;

@Repository
public interface PaymentRepository extends JpaRepository<Payments, Long>{

}
