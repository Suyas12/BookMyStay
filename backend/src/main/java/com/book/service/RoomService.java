package com.book.service;

import java.util.List;
import java.util.Optional;

import com.book.entities.Room;

public interface RoomService {
	public List<Room> findRoomsByHotelId(Long hotelId);

	public Optional<Room> findById(Long roomId);

	public Room addRoom(Room room);

	public void deleteRoom(Long id);
}
