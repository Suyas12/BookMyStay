package com.book.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "bookings")
public class Bookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingid;
    
    @CreationTimestamp
    private LocalDate bookingdate;
    
    private LocalDate checkindate;
    
    private LocalDate checkoutdate;

    @ManyToOne
    @JoinColumn(name = "userid", foreignKey = @ForeignKey(name = "fk_booking_user"))
    private User user;

    @ManyToOne
    @JoinColumn(name = "hotelid", foreignKey = @ForeignKey(name = "fk_booking_hotel"))
    private Hotels hotel;
    
    @ManyToOne
    @JoinColumn(name = "paymentid", foreignKey = @ForeignKey(name = "fk_booking_payment"))
    private Payments payments;
    
    @ManyToOne
    @JoinColumn(name = "roomid", foreignKey = @ForeignKey(name = "fk_booking_room"))
    private Room room;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status;

    // Getters and Setters

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Hotels getHotel() {
        return hotel;
    }

    public void setHotel(Hotels hotel) {
        this.hotel = hotel;
    }

    public Payments getPayments() {
        return payments;
    }

    public void setPayments(Payments payments) {
        this.payments = payments;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Bookings [bookingid=" + bookingid + ", bookingdate=" + bookingdate + ", checkindate=" + checkindate
                + ", checkoutdate=" + checkoutdate + ", user=" + user + ", hotel=" + hotel + ", payments=" + payments
                + ", room=" + room + ", status=" + status + "]";
    }
}
