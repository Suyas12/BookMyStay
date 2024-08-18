package com.book.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.book.DTO.HotelDto;
import com.book.entities.Hotels;
import com.book.entities.User;
import com.book.exception.ResourceNotFoundException;
import com.book.repository.BookingRepository;
import com.book.repository.HotelRepository;
import com.book.repository.RoomRepository;
import com.book.repository.UserRepository;

@Service
@Transactional
public class HotelServiceImpl implements HotelService {
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
	private BookingRepository bookingRepository;
    @Autowired
	private RoomRepository roomRepository;

    public List<HotelDto> getHotelsByStateAndCity(String stateCode, String cityCode) {
        List<Hotels> hotels = hotelRepository.findByCity_CodeAndState_Code(cityCode, stateCode);
        System.out.println(hotels);
        return hotels.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private HotelDto convertToDto(Hotels hotel) {
        Optional<User> owner = userRepository.findById(hotel.getOwner().getUserId());
        HotelDto dto = new HotelDto();
        dto.setHotelid(hotel.getHotelid());
        dto.setOwnername("" + owner.get().getFirstname() + " " + owner.get().getLastname());
        dto.setHotelname(hotel.getHotelname());
        dto.setCity(hotel.getCity().getName()); // Assuming City has a getName method
        dto.setState(hotel.getState().getName()); // Assuming State has a getName method
        return dto;
    }

    public List<Hotels> findHotelsByOwner(Long ownerId) {
        hotelRepository.findByOwner_UserId(ownerId);
        return hotelRepository.findByOwner_UserId(ownerId);
    }

    public Hotels saveHotel(Hotels hotel) {
        User owner = userRepository.findById(hotel.getOwner().getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        hotel.setOwner(owner);
        return hotelRepository.save(hotel);
    }

	@Override
	public List<Hotels> getAllHotels() {
		// TODO Auto-generated method stub
		return hotelRepository.findAll();
	}

	@Override
	public Optional<Hotels> findById(Long hotelId) {
		// TODO Auto-generated method stub
		return hotelRepository.findById(hotelId);
	}

	@Override
	public void deleteHotel(Long hotelId) {
		bookingRepository.deleteByHotel_Hotelid(hotelId);
		roomRepository.deleteByHotel_Hotelid(hotelId);
		hotelRepository.deleteById(hotelId);
		
	}

}
