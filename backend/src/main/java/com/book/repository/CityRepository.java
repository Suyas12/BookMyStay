package com.book.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.book.entities.City;

@Repository
public interface CityRepository extends JpaRepository<City, String> {
    List<City> findByStateCode(String stateCode);
}
