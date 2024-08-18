package com.book.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.book.entities.BookingStatus;
import com.book.entities.Bookings;
import com.book.entities.Hotels;
import com.book.entities.User;
import com.book.service.BookingService;
import com.book.service.HotelService;
import com.book.service.UserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private HotelService hotelService;

    @Autowired
    private BookingService bookingService;

    // Fetch all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Fetch all hotels
    @GetMapping("/hotels")
    public ResponseEntity<List<Hotels>> getAllHotels() {
        List<Hotels> hotels = hotelService.getAllHotels();
        return ResponseEntity.ok(hotels);
    }

    // Fetch all bookings
    @GetMapping("/bookings")
    public ResponseEntity<List<Bookings>> getAllBookings() {
        List<Bookings> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    // Disable a user
    @PatchMapping("/disable-user/{userId}")
    public ResponseEntity<Void> disableUser(@PathVariable Long userId) {
        Optional<User> userOptional = userService.findUserById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setEnabled(false); // Assuming you have an 'enabled' field in your User entity
            userService.save(user);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Delete a hotel
    @DeleteMapping("/delete-hotel/{hotelId}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long hotelId) {
        Optional<Hotels> hotelOptional = hotelService.findById(hotelId);
        if (hotelOptional.isPresent()) {
            hotelService.deleteHotel(hotelId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Cancel a booking
    @PatchMapping("/cancel-booking/{bookingId}")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long bookingId) {
        Bookings booking = bookingService.findBookingById(bookingId);
        if (booking != null) {            
            booking.setStatus(BookingStatus.CANCELLED); // Assuming you have a status field in your Booking entity
            bookingService.save(booking);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @PatchMapping("/enable-user/{userId}")
    public ResponseEntity<String> enableUser(@PathVariable("userId") Long userId) {
        try {
            userService.enableUser(userId);
            return ResponseEntity.ok("User enabled successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error enabling user");
        }
    }
}
