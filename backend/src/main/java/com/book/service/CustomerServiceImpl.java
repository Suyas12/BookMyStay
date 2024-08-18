package com.book.service;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.book.DTO.BookingDto;
import com.book.DTO.HotelDto;
import com.book.entities.Bookings;
import com.book.entities.Hotels;
import com.book.entities.Payments;
import com.book.entities.Room;
import com.book.repository.CustomerRepository;
import com.book.repository.HotelRepository;
import com.book.repository.PaymentRepository;
import com.book.repository.RoomRepository;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private RoomRepository roomRepository;

    // @Autowired
    // private LocationRepository locationsRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CustomerRepository bookingRepository;

    @Autowired
    private HotelRepository hotelRepository;

    public List<Bookings> getAllBookings() {
        return bookingRepository.findAll();
    }

    // public List<HotelDto> getHotelsByState(String state) {
    // List<Hotels> hotels = hotelRepository.findByLocationsState(state);
    // return hotels.stream()
    // .map(this::convertToDto)
    // .collect(Collectors.toList());
    // }

    @Override
    public BookingDto createBooking(BookingDto bookingDto) {

        Payments payment = modelMapper.map(bookingDto, Payments.class);
        payment.setAmount(bookingDto.getAmount());
        payment.setPaymentdate(bookingDto.getPaymentdate());
        Payments savedPayment = paymentRepository.save(payment);

        Hotels hotel = modelMapper.map(bookingDto, Hotels.class);
        hotel.setHotelname(bookingDto.getHotelname());
        Hotels savedHotel = hotelRepository.save(hotel);

        Room room = modelMapper.map(bookingDto, Room.class);
        room.setRoomtype(bookingDto.getRoomtype());
        room.setPriceperday(bookingDto.getPriceperday());
        Room savedRoom = roomRepository.save(room);

        // Locations location = modelMapper.map(bookingDto, Locations.class);
        // location.setCity(bookingDto.getCity());
        // location.setState(bookingDto.getState());
        // Locations savedLocation = locationsRepository.save(location);

        Bookings booking = modelMapper.map(bookingDto, Bookings.class);
        booking.setBookingdate(LocalDate.now());
        booking.setCheckindate(bookingDto.getCheckindate());
        booking.setCheckoutdate(bookingDto.getCheckoutdate());
        booking.setRoom(savedRoom);
        // booking.setLocation(savedLocation);
        booking.setPayments(savedPayment);
        booking.setHotel(savedHotel);
        Bookings savedBooking = customerRepository.save(booking);
        // Update DTO with saved entities

        bookingDto.setBookingid(savedBooking.getBookingid());
        return bookingDto;
    }

    @Override
    public List<HotelDto> getHotelsByState(String state) {
        // TODO Auto-generated method stub
        return null;
    }

}
