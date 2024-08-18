package com.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.book.entities.Hotels;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotels, Long> {
    List<Hotels> findByCity_CodeAndState_Code(String cityCode, String stateCode);

    List<Hotels> findByOwner_UserId(Long userId);
}
