package com.Crown.CrownHotel.dto;

import java.util.ArrayList;
import java.util.List;

import com.Crown.CrownHotel.entity.Booking;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
	
	private Long id;
	private String email;
	private String name;
	private String phoneNumber;
	private String role;
	private List<BookingDTO>Bookings=new ArrayList<>();
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public List<BookingDTO> getBookings() {
		return Bookings;
	}
	public void setBookings(List<BookingDTO> bookings) {
		Bookings = bookings;
	}

}
