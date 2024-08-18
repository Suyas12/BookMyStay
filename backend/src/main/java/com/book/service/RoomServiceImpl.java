package com.book.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.book.entities.Room;
import com.book.repository.BookingRepository;
import com.book.repository.RoomRepository;

@Service
@Transactional
public class RoomServiceImpl implements RoomService {

	@Autowired
	private RoomRepository roomRepository;
	@Autowired
	private BookingRepository bookingRepository;

	@Override
	public List<Room> findRoomsByHotelId(Long hotelId) {
		return roomRepository.findByHotel_Hotelid(hotelId);
	}

	@Override
	public Optional<Room> findById(Long roomId) {
		return roomRepository.findById(roomId);

	}

	@Override
	public Room addRoom(Room room) {
		return roomRepository.save(room);
	}

	@Override
	public void deleteRoom(Long id) {
		bookingRepository.deleteByRoom_Roomid(id);
		roomRepository.deleteById(id);
	}

}
