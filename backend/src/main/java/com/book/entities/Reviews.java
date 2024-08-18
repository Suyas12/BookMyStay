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
@Table(name = "reviews")
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewid;
    
//    @Column(nullable = false)
    private int rating;
    
//    @Column(nullable = false)
    private String comment;

    @ManyToOne
    @JoinColumn(name = "userid", foreignKey = @ForeignKey(name = "fk_user_review"))
    private User user;

    @ManyToOne
    @JoinColumn(name = "hotelid", foreignKey = @ForeignKey(name = "fk_hotel_review"))
    private Hotels hotel;

    public Reviews() {}

	public Reviews(int rating, String comment, User user, Hotels hotel) {
		this.rating = rating;
		this.comment = comment;
		this.user = user;
		this.hotel = hotel;
	}

	public Long getReviewid() {
		return reviewid;
	}

	public void setReviewid(Long reviewid) {
		this.reviewid = reviewid;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
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

	@Override
	public String toString() {
		return "Reviews [reviewid=" + reviewid + ", rating=" + rating + ", comment=" + comment + ", user=" + user
				+ ", hotel=" + hotel + "]";
	}

    
}
