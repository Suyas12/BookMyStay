package com.book.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.book.entities.BookingStatus;
import com.book.entities.Bookings;
import com.book.entities.User;
import com.book.repository.BookingRepository;

@Service
public class BookingService {

	@Autowired
	private BookingRepository bookingRepository;

	public Bookings save(Bookings booking) {
		return bookingRepository.save(booking);
	}

	public List<Bookings> saveAll(List<Bookings> bookings) {
		return bookingRepository.saveAll(bookings);
	}

	public List<Bookings> getBookingsByUser(User user) {
		return bookingRepository.findByUser(user);
	}

	public void deleteBookingById(Long bookingId) {
		if (bookingRepository.existsById(bookingId)) {
			bookingRepository.deleteById(bookingId);
		} else {
			throw new RuntimeException("Booking not found with ID: " + bookingId);
		}
	}

	public Bookings findBookingById(Long bookingId) {
		return bookingRepository.findById(bookingId).orElse(null);
	}

	public List<Bookings> getBookingsByHotel(Long hotelId) {
        return bookingRepository.findByHotel_Hotelid(hotelId);
    }

    public void updateBookingStatus(Long bookingId, BookingStatus status) {
        Bookings booking = bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status);
        bookingRepository.save(booking);
    }

	public List<Bookings> getAllBookings() {
		// TODO Auto-generated method stub
		return bookingRepository.findAll();
	}
}
