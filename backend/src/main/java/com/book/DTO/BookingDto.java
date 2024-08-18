package com.book.DTO;

import java.time.LocalDate;

import com.book.entities.RoomType;

public class BookingDto {
    private Long bookingid;
    private LocalDate bookingdate;
    private LocalDate checkindate;
    private LocalDate checkoutdate;
    private String hotelname;
    private Double priceperday;
    private RoomType roomtype;
	private String city;
    private String state;
    private double amount;
    private LocalDate paymentdate;
    
    
    public BookingDto() {
    }


	public BookingDto(LocalDate bookingdate, LocalDate checkindate, LocalDate checkoutdate, String hotelname,
			Double priceperday, RoomType roomtype, String city, String state, double amount, LocalDate paymentdate) {
		this.bookingdate = bookingdate;
		this.checkindate = checkindate;
		this.checkoutdate = checkoutdate;
		this.hotelname = hotelname;
		this.priceperday = priceperday;
		this.roomtype = roomtype;
		this.city = city;
		this.state = state;
		this.amount = amount;
		this.paymentdate = paymentdate;
	}


	public Long getBookingid() {
		return bookingid;
	}


	public void setBookingid(Long bookingid) {
		this.bookingid = bookingid;
	}


	public LocalDate getBookingdate() {
		return bookingdate;
	}


	public void setBookingdate(LocalDate bookingdate) {
		this.bookingdate = bookingdate;
	}


	public LocalDate getCheckindate() {
		return checkindate;
	}


	public void setCheckindate(LocalDate checkindate) {
		this.checkindate = checkindate;
	}


	public LocalDate getCheckoutdate() {
		return checkoutdate;
	}


	public void setCheckoutdate(LocalDate checkoutdate) {
		this.checkoutdate = checkoutdate;
	}


	public String getHotelname() {
		return hotelname;
	}


	public void setHotelname(String hotelname) {
		this.hotelname = hotelname;
	}


	public Double getPriceperday() {
		return priceperday;
	}


	public void setPriceperday(Double priceperday) {
		this.priceperday = priceperday;
	}


	public RoomType getRoomtype() {
		return roomtype;
	}


	public void setRoomtype(RoomType roomtype) {
		this.roomtype = roomtype;
	}


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}


	public double getAmount() {
		return amount;
	}


	public void setAmount(double amount) {
		this.amount = amount;
	}


	public LocalDate getPaymentdate() {
		return paymentdate;
	}


	public void setPaymentdate(LocalDate paymentdate) {
		this.paymentdate = paymentdate;
	}


	@Override
	public String toString() {
		return "BookingDto [bookingid=" + bookingid + ", bookingdate=" + bookingdate + ", checkindate=" + checkindate
				+ ", checkoutdate=" + checkoutdate + ", hotelname=" + hotelname + ", priceperday=" + priceperday
				+ ", roomtype=" + roomtype + ", city=" + city + ", state=" + state + ", amount=" + amount
				+ ", paymentdate=" + paymentdate + "]";
	}

	
	
    
}