package com.Crown.CrownHotel.service.implmentation;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Crown.CrownHotel.dto.Response;
import com.Crown.CrownHotel.dto.RoomDTO;
import com.Crown.CrownHotel.entity.Room;
import com.Crown.CrownHotel.exception.OurException;
import com.Crown.CrownHotel.repository.BookingRepository;
import com.Crown.CrownHotel.repository.RoomRepository;
import com.Crown.CrownHotel.service.CloudinaryService;
import com.Crown.CrownHotel.service.interfac.IRoomService;
import com.Crown.CrownHotel.utils.Utils;

@Service
public class RoomService implements IRoomService {

	@Autowired
	private RoomRepository roomRepository;
	
	@Autowired
	private BookingRepository bookingRepository;
	
	@Autowired
	private CloudinaryService cloudinaryService;
	
	@Override
	public Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String descrption) {
		
		Response response = new Response();
		
		try {
			//String imageUrl = cloudinaryService.uploadFile(photo);
			Map<String, Object> uploadResult = cloudinaryService.uploadFile(photo);
			String imageUrl = (String) uploadResult.get("secure_url");
			
			Room room = new Room();
			
			room.setRoomPhotoUrl(imageUrl);
			room.setRoomType(roomType);
			room.setRoomPrice(roomPrice);
			room.setRoomDescription(descrption);
			Room savedRoom = roomRepository.save(room);
			RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(savedRoom);
			response.setStatusCode(200);
			response.setMessage("successful");
			response.setRoom(roomDTO);
			
		
		}
		
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error adding a room"+e.getMessage());
		}
		
		return response;
	}

	@Override
	public List<String> getAllRoomType() {
		
	
		return  roomRepository.findDistinctRoomTypes();
	}

	@Override
	public Response getAllRoom() {
		Response response = new Response();
		
		try {
			List<Room>roomList = roomRepository.findAll(Sort.by(Direction.DESC, "id"));
			List<RoomDTO>roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);
			response.setStatusCode(200);
			response.setMessage("successful");
			response.setRoomList(roomDTOList);
			
		
		}
		
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error adding a room"+e.getMessage());
		}
		
		return response;
	}

	@Override
	public Response deleteRoom(Long roomId) {
		
		Response response = new Response();
		
		try {
			roomRepository.findById(roomId).orElseThrow(()->new OurException("Room Not Found"));
			roomRepository.deleteById(roomId);
			response.setStatusCode(200);
			response.setMessage("successful");
			
			
		
		}
		catch(OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
		}
		
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error saving a room"+e.getMessage());
		}
		
		return response;
	}

	@Override
	public Response updateRoom(Long roomId,String description, String roomType, BigDecimal roomPrice, MultipartFile photo) {

		Response response = new Response();
		
		try {
			String imageUrl = null;
			if (photo != null && !photo.isEmpty()) {
			    Map<String, Object> uploadResult = cloudinaryService.uploadFile(photo);
			    imageUrl = (String) uploadResult.get("secure_url");
			}
			Room room = roomRepository.findById(roomId).orElseThrow(()-> new OurException("Room Not Found"));
			
			if(roomType != null)room.setRoomType(roomType);
			if(roomPrice != null)room.setRoomPrice(roomPrice);
			if(description != null)room.setRoomDescription(description);
			if(imageUrl != null)room.setRoomPhotoUrl(imageUrl);
			
			Room updateRoom = roomRepository.save(room);
			RoomDTO roomDTO =Utils.mapRoomEntityToRoomDTO(updateRoom);
			
			
			response.setStatusCode(200);
			response.setMessage("successful");
			response.setRoom(roomDTO);
			
			
		
		}
		catch(OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
		}
		
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error update a room"+e.getMessage());
		}
		
		return response;
	}

	@Override
	public Response getRoomById(Long roomId) {

	    Response response = new Response();

	    try {
	        Room room = roomRepository.findById(roomId)
	                .orElseThrow(() -> new OurException("Room Not Found"));

	        RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTOplusBookings(room);

	        response.setStatusCode(200);
	        response.setMessage("successful");
	        response.setRoom(roomDTO);

	    } catch (OurException e) {
	        response.setStatusCode(404);
	        response.setMessage(e.getMessage());

	    } catch (Exception e) {
	        response.setStatusCode(500);
	        response.setMessage("Error getting a room" + e.getMessage());
	    }

	    return response;
	}

	@Override
	public Response getAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
Response response = new Response();
		
		try {
			
			List<Room> availableRooms = roomRepository.findAvailableRoomsByDatesAndTypes(checkInDate, checkOutDate, roomType);
			List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(availableRooms);
			response.setStatusCode(200);
			response.setMessage("successful");
			response.setRoomList(roomDTOList);
			
			
		
		}
		
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error saving a room"+e.getMessage());
		}
		
		return response;
	}

	@Override
	public Response getAllAvailable() {
		Response response = new Response();
		
		try {
			List<Room> roomList = roomRepository.getAllAvailableRooms();
			List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);
			response.setStatusCode(200);
			response.setMessage("successful");
			response.setRoomList(roomDTOList);
			
			
		
		}
		catch(OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
		}
		
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error saving a room"+e.getMessage());
		}
		
		return response;
	}

}
