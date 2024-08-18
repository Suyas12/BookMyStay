package com.book.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.book.entities.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long>{
	   List<Room> findByHotel_Hotelid(Long hotelid);
	    void deleteByHotel_Hotelid(Long hotelid);

}
