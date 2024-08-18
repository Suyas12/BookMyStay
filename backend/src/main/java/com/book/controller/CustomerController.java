package com.book.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.book.DTO.BookingDto;
import com.book.DTO.BookingRequest;
import com.book.DTO.HotelDto;
import com.book.entities.BookingStatus;
import com.book.entities.Bookings;
import com.book.entities.City;
import com.book.entities.PaymentMode;
import com.book.entities.Payments;
import com.book.entities.Room;
import com.book.entities.State;
import com.book.entities.User;
import com.book.service.BookingService;
import com.book.service.CityService;
import com.book.service.CustomerService;
import com.book.service.EmailService;
import com.book.service.HotelService;
import com.book.service.PaymentService;
import com.book.service.RoomService;
import com.book.service.StateService;
import com.book.service.UserService;
import com.book.DTO.ContactFormDTO;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {

	@Autowired
	private CustomerService customerService;

	@Autowired
	private StateService stateService;

	@Autowired
	private CityService cityService;

	@Autowired
	private RoomService roomService;

	@Autowired
	private BookingService bookingService;

	@Autowired
	private UserService userService;

	@Autowired
	private PaymentService paymentService;

	@Autowired
	private HotelService hotelService;

	@Autowired
	private EmailService emailService;

	// @GetMapping("/hotels")
	// public List<HotelDto> getHotelsByState(@RequestParam String state) {
	// return customerService.getHotelsByState(state);
	// }

	@PostMapping("/book")
	public BookingDto bookHotel(@RequestBody BookingDto bookingDto) {
		return customerService.createBooking(bookingDto);
	}

	@GetMapping("/states")
	public List<State> getAllStates() {
		return stateService.getAllStates();
	}

	@GetMapping("/states/{code}")
	public State getStateByCode(@PathVariable String code) {
		return stateService.getStateByCode(code);
	}

	@PostMapping("/states")
	public State createOrUpdateState(@RequestBody State state) {
		return stateService.createOrUpdateState(state);
	}

	@GetMapping("/city/{stateCode}")
	public List<City> getCitiesByStateCode(@PathVariable String stateCode) {
		return cityService.getCitiesByStateCode(stateCode);
	}

	@PostMapping("/city")
	public City createOrUpdateCity(@RequestBody City city) {
		return cityService.createOrUpdateCity(city);
	}

	@GetMapping("/hotels")
	public List<HotelDto> getHotelsByStateAndCity(@RequestParam(required = false) String state,
			@RequestParam(required = false) String city) {
		return hotelService.getHotelsByStateAndCity(state, city);
	}

	@GetMapping("/hotel/{hotelId}/rooms")
	public ResponseEntity<List<Room>> getRoomsByHotelId(@PathVariable Long hotelId) {
		List<Room> rooms = roomService.findRoomsByHotelId(hotelId);
		if (rooms.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(rooms);
	}

	@PostMapping("/booking")
	public ResponseEntity<?> createBooking(@RequestBody BookingRequest bookingRequest) {
		try {
			Long userId = bookingRequest.getUserId();
			List<Long> roomIds = bookingRequest.getRoomIds();
			LocalDate checkInDate = bookingRequest.getCheckInDate();
			LocalDate checkOutDate = bookingRequest.getCheckOutDate();
			Long totalPay = bookingRequest.getTotalPay();
			Payments payment = new Payments();
			payment.setAmount(totalPay);
			payment.setPaymentdate(LocalDate.now());
			payment.setPaymentmode(PaymentMode.valueOf(bookingRequest.getPaymentMode()));
			payment = paymentService.save(payment);

			// Validate user
			Optional<User> user = userService.findUserById(userId);
			if (!user.isPresent()) {
				return ResponseEntity.badRequest().body("Invalid user.");
			}

			// Validate rooms and create bookings
			List<Bookings> bookings = new ArrayList<>();
			for (Long roomId : roomIds) {
				Optional<Room> room = roomService.findById(roomId);
				if (!room.isPresent()) {
					return ResponseEntity.badRequest().body("Invalid room ID: " + roomId);
				}

				Bookings booking = new Bookings();
				booking.setUser(user.get());
				booking.setRoom(room.get());
				booking.setCheckindate(checkInDate);
				booking.setCheckoutdate(checkOutDate);
				booking.setHotel(room.get().getHotel()); // Assuming Room has a Hotel
				booking.setPayments(payment); // Set payment details after payment processing
				booking.setStatus(BookingStatus.CONFIRMED);
				bookings.add(booking);
			}

			// Save all bookings
			List<Bookings> savedBookings = bookingService.saveAll(bookings);
			String recipient = user.get().getEmail();
			String subject = "Complete Registration!";
			String text = String.format("Hi %s, your booking has been confirmed. Total amount paid by you: %s.",
					user.get().getFirstname(), totalPay);

			emailService.sendEmail(recipient, subject, text);
			return ResponseEntity.ok(savedBookings);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("An error occurred while creating the booking.");
		}
	}

	@GetMapping("/booking/{userid}")
	public ResponseEntity<?> getBookingsByUserId(@PathVariable Long userid) {
		Optional<User> user = userService.findUserById(userid);
		if (!user.isPresent()) {
			return ResponseEntity.badRequest().body("Invalid user.");
		}
		List<Bookings> bookings = bookingService.getBookingsByUser(user.get());
		if (bookings.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(bookings);
	}

	@DeleteMapping("/booking/{bookingId}")
	public ResponseEntity<?> deleteBookingsById(@PathVariable Long bookingId) {
		try {
			bookingService.deleteBookingById(bookingId);
			return ResponseEntity.noContent().build(); // HTTP 204 No Content
		} catch (Exception e) {
			return ResponseEntity.status(404).body("Booking not found"); // HTTP 404 Not Found
		}
	}

	@PutMapping("/booking/cancel/{bookingId}")
	public ResponseEntity<?> cancelBookingById(@PathVariable Long bookingId) {
		try {
			Bookings booking = bookingService.findBookingById(bookingId);
			if (booking == null) {
				return ResponseEntity.status(404).body("Booking not found"); // HTTP 404 Not Found
			}

			// Update the booking status to CANCELLED
			booking.setStatus(BookingStatus.CANCELLED);
			bookingService.save(booking); // Save the updated booking

			return ResponseEntity.ok("Booking cancelled successfully"); // HTTP 200 OK
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error cancelling booking"); // HTTP 500 Internal Server Error
		}
	}

	@PostMapping("/contact")
	public ResponseEntity<String> handleContactForm(@Valid @RequestBody ContactFormDTO contactFormDTO) {
		String recipient = contactFormDTO.getEmail();
		String subject = "Complete Registration!";
		String text = "Thank You for contacting BookMyStay. Have a nice day.";

		emailService.sendEmail(recipient, subject, text);
		return new ResponseEntity<>(
				"Thank you for contacting us, " + contactFormDTO.getName() + ". We will get back to you shortly.",
				HttpStatus.OK);
	}

}
