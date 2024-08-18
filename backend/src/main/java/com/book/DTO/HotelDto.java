package com.book.DTO;

import com.book.entities.RoomType;

public class HotelDto {
    private Long hotelid;
    private String ownername;
    private String hotelname;
    private String numberofrooms;
    private RoomType roomtype;
    private double priceperday;
    private String city;
    private String state;
    private String pincode;
    
	public HotelDto() {
	}

	public HotelDto(String ownername, String hotelname, String numberofrooms, RoomType roomtype, double priceperday,
			String city, String state, String pincode) {
		this.ownername = ownername;
		this.hotelname = hotelname;
		this.numberofrooms = numberofrooms;
		this.roomtype = roomtype;
		this.priceperday = priceperday;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
	}

	public Long getHotelid() {
		return hotelid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public String getOwnername() {
		return ownername;
	}

	public void setOwnername(String ownername) {
		this.ownername = ownername;
	}

	public String getHotelname() {
		return hotelname;
	}

	public void setHotelname(String hotelname) {
		this.hotelname = hotelname;
	}

	public String getNumberofrooms() {
		return numberofrooms;
	}

	public void setNumberofrooms(String numberofrooms) {
		this.numberofrooms = numberofrooms;
	}

	public RoomType getRoomtype() {
		return roomtype;
	}

	public void setRoomtype(RoomType roomtype) {
		this.roomtype = roomtype;
	}

	public double getPriceperday() {
		return priceperday;
	}

	public void setPriceperday(double priceperday) {
		this.priceperday = priceperday;
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

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	@Override
	public String toString() {
		return "HotelDto [hotelid=" + hotelid + ", ownername=" + ownername + ", hotelname=" + hotelname
				+ ", numberofrooms=" + numberofrooms + ", roomtype=" + roomtype + ", priceperday=" + priceperday
				+ ", city=" + city + ", state=" + state + ", pincode=" + pincode + "]";
	}

}