package com.book.service;

import java.util.List;
import java.util.Optional;

import com.book.DTO.HotelDto;
import com.book.entities.Hotels;

public interface HotelService {
    public List<HotelDto> getHotelsByStateAndCity(String state, String city);

    public List<Hotels> findHotelsByOwner(Long ownerId);

    public Hotels saveHotel(Hotels hotel);

	public List<Hotels> getAllHotels();

	public Optional<Hotels> findById(Long hotelId);

	public void deleteHotel(Long hotelId);
}
