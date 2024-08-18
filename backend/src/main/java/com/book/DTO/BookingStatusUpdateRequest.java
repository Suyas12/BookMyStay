package com.book.DTO;

public class BookingStatusUpdateRequest {

    private Long bookingId;
    private String status;

    // Default constructor
    public BookingStatusUpdateRequest() {
    }

    // Parameterized constructor
    public BookingStatusUpdateRequest(Long bookingId, String status) {
        this.bookingId = bookingId;
        this.status = status;
    }

    // Getters and Setters
    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}