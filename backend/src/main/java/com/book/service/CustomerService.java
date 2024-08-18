package com.book.service;

import java.util.List;

import com.book.DTO.BookingDto;
import com.book.DTO.HotelDto;
import com.book.entities.Bookings;

public interface CustomerService {
	public List<HotelDto> getHotelsByState(String state);

	public BookingDto createBooking(BookingDto bookingDto);

	public List<Bookings> getAllBookings();
}
