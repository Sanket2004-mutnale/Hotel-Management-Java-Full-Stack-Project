package com.Crown.CrownHotel.dto;

import java.math.BigDecimal;
import java.util.List;

import com.Crown.CrownHotel.entity.Booking;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoomDTO {

	private Long id;
	private String roomType;
	private BigDecimal roomPrice;
	private String roomPhotoUrl;
	private String roomDescription;
	private List<BookingDTO>Bookings;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getRoomType() {
		return roomType;
	}
	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}
	public BigDecimal getRoomPrice() {
		return roomPrice;
	}
	public void setRoomPrice(BigDecimal roomPrice) {
		this.roomPrice = roomPrice;
	}
	public String getRoomPhotoUrl() {
		return roomPhotoUrl;
	}
	public void setRoomPhotoUrl(String roomPhotoUrl) {
		this.roomPhotoUrl = roomPhotoUrl;
	}
	public String getRoomDescription() {
		return roomDescription;
	}
	public void setRoomDescription(String roomDescription) {
		this.roomDescription = roomDescription;
	}
	public List<BookingDTO> getBookings() {
		return Bookings;
	}
	public void setBookings(List<BookingDTO> bookings) {
		Bookings = bookings;
	}
	
	
	
	
}
