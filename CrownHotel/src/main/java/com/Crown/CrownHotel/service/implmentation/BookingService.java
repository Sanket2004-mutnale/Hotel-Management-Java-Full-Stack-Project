package com.Crown.CrownHotel.service.implmentation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.Crown.CrownHotel.dto.BookingDTO;
import com.Crown.CrownHotel.dto.Response;
import com.Crown.CrownHotel.entity.Booking;
import com.Crown.CrownHotel.entity.User;
import com.Crown.CrownHotel.entity.Room;
import com.Crown.CrownHotel.exception.OurException;
import com.Crown.CrownHotel.repository.BookingRepository;
import com.Crown.CrownHotel.repository.RoomRepository;
import com.Crown.CrownHotel.repository.UserRepository;
import com.Crown.CrownHotel.service.interfac.IBookingService;
import com.Crown.CrownHotel.service.interfac.IRoomService;
import com.Crown.CrownHotel.utils.Utils;

@Service
public class BookingService implements IBookingService{

	@Autowired
	private BookingRepository bookingRepository;
	
	@Autowired
	private IRoomService roomService;
	
	@Autowired
	private RoomRepository roomRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	
	
	@Override
	public Response saveBooking(Long roomId, Long userId, Booking bookingRequest) {
		
		Response response = new Response();
		
		try {
			if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
			throw new IllegalArgumentException("Check-out date must be after check-in date");
			}
		
		Room room = roomRepository.findById(roomId).orElseThrow(()-> new OurException("Room Not found"));
		User user = userRepository.findById(userId).orElseThrow(()-> new OurException("User Not Found"));
		
		List<Booking> existingBookings = room.getBookings();
		
		if(!roomIsAvailable(bookingRequest,existingBookings)) {
			throw new OurException("Room Not Available for selected data range");
			
		}
		
		bookingRequest.setRoom(room);
		bookingRequest.setUser(user);
		String bookingConfirmationCode = Utils.generateRandomConfirmationCode(10);
		bookingRequest.setBookingConfirmationCode(bookingConfirmationCode);
		bookingRepository.save(bookingRequest);
		response.setStatusCode(200);
		response.setMessage("Successful");
		response.setBookingConfirmationCode(bookingConfirmationCode);
		}
		catch(OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
			
		}
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error Saving a Booking"+e.getMessage());
		}
		return response;
	}




	@Override
	public Response findBookingByConfirmationCode(String confirmationCode) {
		
		Response response = new Response();
		try {
		Booking booking = bookingRepository.findByBookingConfirmationCode(confirmationCode).orElseThrow(()-> new OurException("Booking Not found"));
		BookingDTO bookingDTO = Utils.mapBookingEntityToBookingDTOPlusBookedRoom(booking,true);
		
		response.setStatusCode(200);
		response.setMessage("Successful");
		response.setBooking(bookingDTO);
		}
		catch(OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
			
		}
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error Finding a Booking"+e.getMessage());
		}
		return response;
		
	}

	@Override
	public Response getAllBooking() {

		Response response = new Response();
		
		try {
		List<Booking> bookingList = bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
		List<BookingDTO> bookingDTOList = Utils.mapBookingListEntityToBookingListDTO(bookingList);
		
		response.setStatusCode(200);
		response.setMessage("Successful");
		response.setBookingList(bookingDTOList);
		}
		catch(OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
			
		}
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error Getting  All  a Booking"+e.getMessage());
		}
		return response;
		
			}

	@Override
	public Response cancelBooking(Long bookingId) {
		Response response = new Response();
		
		try {
		Booking bookings = bookingRepository.findById(bookingId).orElseThrow(()-> new OurException("Booking Does not Exits"));
		bookingRepository.deleteById(bookingId);
		
		response.setStatusCode(200);
		response.setMessage("Successful");
		
		}
		catch(OurException e) {
			response.setStatusCode(404);
			response.setMessage(e.getMessage());
			
		}
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error Cancelling a Booking"+e.getMessage());
		}
		return response;
		
		
	}
	
	private boolean roomIsAvailable(Booking bookingRequest, List<Booking> existingBookings) {
		
		return existingBookings.stream()

				.noneMatch(existingBooking ->

					bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())

					|| bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())

					||(bookingRequest.getCheckInDate().isAfter (existingBooking.getCheckInDate())

				    && bookingRequest.getCheckInDate().isBefore (existingBooking.getCheckOutDate()))

					||(bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())


					&& bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))

					|| (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

					
					&& bookingRequest.getCheckOutDate().isAfter (existingBooking.getCheckOutDate()))

					
					|| (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())

					&& bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))


					|| ( bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate ())

					&& bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))


						);

	}

}
