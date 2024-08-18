package com.book.entities;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "payments")
public class Payments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentid;
    
//    @Column(nullable = false)
    private double amount;

    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
    private PaymentMode paymentmode;
    
//    @Column(nullable = false)
    private LocalDate paymentdate;


    public Payments() {}


	public Payments(double amount, PaymentMode paymentmode, LocalDate paymentdate) {
		this.amount = amount;
		this.paymentmode = paymentmode;
		this.paymentdate = paymentdate;
	}


	public Long getPaymentid() {
		return paymentid;
	}


	public void setPaymentid(Long paymentid) {
		this.paymentid = paymentid;
	}


	public double getAmount() {
		return amount;
	}


	public void setAmount(double amount) {
		this.amount = amount;
	}


	public PaymentMode getPaymentmode() {
		return paymentmode;
	}


	public void setPaymentmode(PaymentMode paymentmode) {
		this.paymentmode = paymentmode;
	}


	public LocalDate getPaymentdate() {
		return paymentdate;
	}


	public void setPaymentdate(LocalDate paymentdate) {
		this.paymentdate = paymentdate;
	}


	@Override
	public String toString() {
		return "Payments [paymentid=" + paymentid + ", amount=" + amount + ", paymentmode=" + paymentmode
				+ ", paymentdate=" + paymentdate + "]";
	}  
}
