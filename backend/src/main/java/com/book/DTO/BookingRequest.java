package com.book.DTO;

import java.time.LocalDate;
import java.util.List;

public class BookingRequest {
	  private Long userId;
	    private List<Long> roomIds; // Change to List<Long> to support multiple rooms
	    private LocalDate checkInDate;
	    private LocalDate checkOutDate;
	    private Long hotelId;
	    private Long totalPay;
		private String paymentMode;
		public Long getUserId() {
			return userId;
		}
		public void setUserId(Long userId) {
			this.userId = userId;
		}
		public List<Long> getRoomIds() {
			return roomIds;
		}
		public void setRoomIds(List<Long> roomIds) {
			this.roomIds = roomIds;
		}
		public LocalDate getCheckInDate() {
			return checkInDate;
		}
		public void setCheckInDate(LocalDate checkInDate) {
			this.checkInDate = checkInDate;
		}
		public LocalDate getCheckOutDate() {
			return checkOutDate;
		}
		public void setCheckOutDate(LocalDate checkOutDate) {
			this.checkOutDate = checkOutDate;
		}
		public Long getHotelId() {
			return hotelId;
		}
		public void setHotelId(Long hotelId) {
			this.hotelId = hotelId;
		}
		public Long getTotalPay() {
			return totalPay;
		}
		public void setTotalPay(Long totalPay) {
			this.totalPay = totalPay;
		}
		public String getPaymentMode() {
			return paymentMode;
		}
		public void setPaymentMode(String paymentMode) {
			this.paymentMode = paymentMode;
		}
		@Override
		public String toString() {
			return "BookingRequest [userId=" + userId + ", roomIds=" + roomIds + ", checkInDate=" + checkInDate
					+ ", checkOutDate=" + checkOutDate + ", hotelId=" + hotelId + ", totalPay=" + totalPay
					+ ", paymentMode=" + paymentMode + "]";
		}
		
    
}
