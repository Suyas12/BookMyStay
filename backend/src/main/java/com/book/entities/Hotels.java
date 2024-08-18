package com.book.entities;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "hotels")
public class Hotels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hotelid;

    private String hotelname;

    @ManyToOne
    @JoinColumn(name = "city_code", foreignKey = @ForeignKey(name = "fk_hotel_city"))
    private City city;

    @ManyToOne
    @JoinColumn(name = "state_code", foreignKey = @ForeignKey(name = "fk_hotel_state"))
    private State state;

    @ManyToOne
    @JoinColumn(name = "userid", foreignKey = @ForeignKey(name = "fk_hotel_owner"))
    private User owner;

    public Hotels() {
    }

    public Hotels(String hotelname, City city, State state, User owner) {
        this.hotelname = hotelname;
        this.city = city;
        this.state = state;
        this.owner = owner;
    }

    public Long getHotelid() {
        return hotelid;
    }

    public void setHotelid(Long hotelid) {
        this.hotelid = hotelid;
    }

    public String getHotelname() {
        return hotelname;
    }

    public void setHotelname(String hotelname) {
        this.hotelname = hotelname;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    @Override
    public String toString() {
        return "Hotels [hotelid=" + hotelid + ", hotelname=" + hotelname + ", city=" + city + ", state=" + state
                + ", owner=" + owner + "]";
    }
}