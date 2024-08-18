package com.book.controller;

import com.book.entities.Room;
import com.book.entities.RoomType;
import com.book.repository.HotelRepository;
import com.book.service.HotelService;
import com.book.service.RoomService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rooms")
@CrossOrigin
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private HotelRepository hotelRepository;

    @PostMapping
    public Room addRoom(@RequestBody Room room) {

        Room newRoom = new Room();
        newRoom.setHotel(hotelRepository.findById(room.getHotel().getHotelid())
                .orElseThrow(() -> new RuntimeException("Hotel not found")));
        newRoom.setPriceperday(room.getPriceperday());
        newRoom.setRoomtype(room.getRoomtype());
        return roomService.addRoom(room);
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
    }

    @GetMapping("/hotel/{hotelId}")
    public List<Room> getRoomsByHotelId(@PathVariable Long hotelId) {
        return roomService.findRoomsByHotelId(hotelId);
    }
}
