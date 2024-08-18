package com.book.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.book.DTO.BookingStatusUpdateRequest;
import com.book.entities.BookingStatus;
import com.book.entities.Bookings;
import com.book.entities.Hotels;
import com.book.entities.User;
import com.book.service.BookingService;
import com.book.service.CityService;
import com.book.service.HotelService;
import com.book.service.StateService;
import com.book.service.UserService;

@RestController
@RequestMapping("/owner")
@CrossOrigin

public class HotelOwnerController {

	@Autowired
	private UserService userService;

	@Autowired
	private HotelService hotelService;

	@Autowired
	private CityService cityService;

	@Autowired
	private StateService stateService;

	@Autowired
	private BookingService bookingService;

	@GetMapping("/profile/{ownerId}")
	public ResponseEntity<?> getOwnerProfile(@PathVariable Long ownerId) {
		try {
			Optional<User> owner = userService.findUserById(ownerId);
			return ResponseEntity.ok(owner.get());
		} catch (Exception e) {
			return ResponseEntity.status(404).body("Owner not found");
		}
	}

	@GetMapping("/hotels/{ownerId}")
	public ResponseEntity<?> getOwnerHotels(@PathVariable Long ownerId) {
		try {
			List<Hotels> hotels = hotelService.findHotelsByOwner(ownerId);
			return ResponseEntity.ok(hotels);
		} catch (Exception e) {
			return ResponseEntity.status(404).body("No hotels found for this owner");
		}
	}

	@PostMapping("/add-hotel")
	public ResponseEntity<?> addHotel(@RequestBody Hotels hotel) {
		try {
			Hotels newHotel = hotelService.saveHotel(hotel);
			newHotel.setCity(cityService.findCityNameByCode(hotel.getCity().getCode()));
			newHotel.setState(stateService.findStateNameByCode(hotel.getState().getCode()));
			return ResponseEntity.ok(newHotel);
		} catch (Exception e) {
			return ResponseEntity.status(400).body("Error adding hotel");
		}
	}

	@GetMapping("/bookings/{hotelId}")
	public List<Bookings> getBookingsByHotel(@PathVariable Long hotelId) {
		return bookingService.getBookingsByHotel(hotelId);
	}

	@PutMapping("/bookings")
	public void updateBookingStatus(@RequestBody BookingStatusUpdateRequest bookingStatusUpdateRequest) {
		bookingService.updateBookingStatus(bookingStatusUpdateRequest.getBookingId(),
				BookingStatus.valueOf(bookingStatusUpdateRequest.getStatus()));
	}

}
