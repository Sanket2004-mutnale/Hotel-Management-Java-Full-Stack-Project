package com.Crown.CrownHotel.service.interfac;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.Crown.CrownHotel.dto.Response;
import com.Crown.CrownHotel.entity.User;

public interface IRoomService {
	
	Response addNewRoom(MultipartFile photo, String roomType,BigDecimal roomPrice, String descrption);
	
	List<String>getAllRoomType();
	
	Response getAllRoom();
	
	Response deleteRoom(Long roomId);
	
	Response updateRoom(Long roomId,String description,String roomType,BigDecimal roomPrice, MultipartFile photo);
	
	Response getRoomById(Long roomId);
	
	Response getAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate,String roomType);
	
	Response getAllAvailable();
}
