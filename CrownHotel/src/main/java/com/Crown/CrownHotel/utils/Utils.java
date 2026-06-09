package com.Crown.CrownHotel.utils;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

import com.Crown.CrownHotel.dto.BookingDTO;
import com.Crown.CrownHotel.dto.RoomDTO;
import com.Crown.CrownHotel.dto.UserDTO;
import com.Crown.CrownHotel.entity.Booking;
import com.Crown.CrownHotel.entity.Room;
import com.Crown.CrownHotel.entity.User;

public class Utils {

    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    private static final SecureRandom secureRandom = new SecureRandom();

    public static String generateRandomConfirmationCode(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            stringBuilder.append(ALPHANUMERIC_STRING.charAt(randomIndex));
        }
        return stringBuilder.toString();
    }

    public static UserDTO mapUserEntityToUserDTO(User user) {
        if (user == null) return null;
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    public static RoomDTO mapRoomEntityToRoomDTO(Room room) {
        if (room == null) return null;
        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setId(room.getId());
        roomDTO.setRoomType(room.getRoomType());
        roomDTO.setRoomPrice(room.getRoomPrice());
        roomDTO.setRoomPhotoUrl(room.getRoomPhotoUrl());
        roomDTO.setRoomDescription(room.getRoomDescription());
        return roomDTO;
    }

    public static BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
        if (booking == null) return null;
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setNumOfAdults(booking.getNumOfAdults());
        dto.setNumOfChildren(booking.getNumOfChildren());
        dto.setTotalNumOfGuest(booking.getTotalNumOfGuest());
        return dto;
    }

    public static RoomDTO mapRoomEntityToRoomDTOplusBookings(Room room) {
        RoomDTO dto = mapRoomEntityToRoomDTO(room);
        if (room.getBookings() != null && !room.getBookings().isEmpty()) {
            dto.setBookings(room.getBookings().stream()
                .map(Utils::mapBookingEntityToBookingDTO)
                .collect(Collectors.toList()));
        }
        return dto;
    }

    public static UserDTO mapUserEntityToUserDTOPlusUserBookingsAndRoom(User user) {
        UserDTO userDTO = mapUserEntityToUserDTO(user);
        if (user.getBookings() != null && !user.getBookings().isEmpty()) {
            userDTO.setBookings(
                user.getBookings().stream()
                    .map(b -> mapBookingEntityToBookingDTOPlusBookedRoom(b, false))
                    .collect(Collectors.toList())
            );
        }
        return userDTO;
    }

    public static BookingDTO mapBookingEntityToBookingDTOPlusBookedRoom(Booking booking, boolean mapUser) {
        BookingDTO dto = mapBookingEntityToBookingDTO(booking);
        if (mapUser && booking.getUser() != null) {
            dto.setUser(mapUserEntityToUserDTO(booking.getUser()));
        }
        if (booking.getRoom() != null) {
            dto.setRoom(mapRoomEntityToRoomDTO(booking.getRoom()));
        }
        return dto;
    }

    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    public static List<RoomDTO> mapRoomListEntityToRoomListDTO(List<Room> roomList) {
        return roomList.stream().map(Utils::mapRoomEntityToRoomDTO).collect(Collectors.toList());
    }

    public static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookingList) {
        return bookingList.stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList());
    }
}





//package com.Crown.CrownHotel.utils;
//
//import java.security.SecureRandom;
//import java.util.List;
//import java.util.stream.Collectors;
//
//import com.Crown.CrownHotel.dto.BookingDTO;
//import com.Crown.CrownHotel.dto.RoomDTO;
//import com.Crown.CrownHotel.dto.UserDTO;
//import com.Crown.CrownHotel.entity.Booking;
//import com.Crown.CrownHotel.entity.Room;
//import com.Crown.CrownHotel.entity.User;
//
//public class Utils {
//
//	private static final String ALPHANUMERIC_STRING="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
//	private static SecureRandom secureRandom =new SecureRandom();
//	
//	public static String generateRandomConfirmationCode(int length) {
//		StringBuilder stringBuilder = new StringBuilder();
//		
//		for(int i=0;i<length;i++) {
//			int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
//			char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
//			stringBuilder.append(randomChar);
//		}
//		return stringBuilder.toString();
//	}
//	
//	public static UserDTO mapUserEntityToUserDTO(User user) {
//		
//		UserDTO userDTO = new UserDTO();
//		
//		userDTO.setId(user.getId());
//		userDTO.setName(user.getName());
//		userDTO.setEmail(user.getEmail());
//		userDTO.setPhoneNumber(user.getPhoneNumber());
//		userDTO.setRole(user.getRole());
//		
//		return userDTO;
//	}
//	
//
//	public static RoomDTO mapRoomEntityToRoomDTO(Room room) {
//		
//		RoomDTO roomDTO = new RoomDTO();
//		
//		roomDTO.setId(room.getId());
//		roomDTO.setRoomType(room.getRoomType());
//		roomDTO.setRoomPrice(room.getRoomPrice());
//		roomDTO.setRoomPhotoUrl(room.getroomPhotoUrl());
//		return roomDTO;
//	}
//	
//	public static BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
//		
//		BookingDTO bookingDTO = new BookingDTO();
//		
//		bookingDTO.setId(booking.getId());
//		bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
//		bookingDTO.setCheckInDate(booking.getCheckInDate());
//		bookingDTO.setCheckOutDate(booking.getCheckOutDate());
//		bookingDTO.setNumOfAdults(booking.getNumOfAdults());
//		bookingDTO.setNumOfChildern(booking.getNumOfChildern());
//		bookingDTO.setTotalNumOfGuset(booking.getTotalNumOfGuset());
//		return bookingDTO;
//	}
//	
//
//	public static RoomDTO mapRoomEntityToRoomDTOplusBookings(Room room) {
//		
//		RoomDTO roomDTO = new RoomDTO();
//		
//		roomDTO.setId(room.getId());
//		roomDTO.setRoomType(room.getRoomType());
//		roomDTO.setRoomPrice(room.getRoomPrice());
//		roomDTO.setRoomPhotoUrl(room.getroomPhotoUrl());
//	//	roomDTO.setRoomDescription(room.getRoomDescription());
//		
//		if(room.getBookings()!=null) {
//			roomDTO.setBookings(room.getBookings().stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList()));
//		}
//		return roomDTO;
//	}
//
//	public static UserDTO mapUserEntityToUserDTOPluaUserBookingsAndRoom(User user) {
//		
//		UserDTO userDTO = new UserDTO();
//		
//		userDTO.setId(user.getId());
//		userDTO.setName(user.getName());
//		userDTO.setEmail(user.getEmail());
//		userDTO.setPhoneNumber(user.getPhoneNumber());
//		userDTO.setRole(user.getRole());
//		
//		if (user.getBookings() != null && !user.getBookings().isEmpty()) {
//            userDTO.setBookings(
//                user.getBookings().stream()
//                    .map(booking -> mapBookingEntityToBookingDTOPlusBookedRoom(booking, false))
//                    .collect(Collectors.toList())
//            );
//        }
//
//        return userDTO;
//    }
//	
//	public static BookingDTO mapBookingEntityToBookingDTOPlusBookedRoom(Booking booking, boolean mapUser) {
//BookingDTO bookingDTO = new BookingDTO();
//		
//		bookingDTO.setId(booking.getId());
//		bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
//		bookingDTO.setCheckInDate(booking.getCheckInDate());
//		bookingDTO.setCheckOutDate(booking.getCheckOutDate());
//		bookingDTO.setNumOfAdults(booking.getNumOfAdults());
//		bookingDTO.setNumOfChildern(booking.getNumOfChildern());
//		bookingDTO.setTotalNumOfGuset(booking.getTotalNumOfGuset());
//		
//		if(mapUser) {
//			bookingDTO.setUser(Utils.mapUserEntityToUserDTO(booking.getUser()));
//			
//		}
//		if(booking.getRoom()!=null) {
//			RoomDTO roomDTO = new RoomDTO();
//			
//			roomDTO.setId(booking.getRoom().getId());
//			roomDTO.setRoomType(booking.getRoom().getRoomType());
//			roomDTO.setRoomPrice(booking.getRoom().getRoomPrice());
//			roomDTO.setRoomPhotoUrl(booking.getRoom().getroomPhotoUrl());
//			roomDTO.setRoomDescription(booking.getRoom().getRoomDescription());
//			bookingDTO.setRoom(roomDTO);
//		}
//		return bookingDTO;
//	}
//	
//	public static List<UserDTO>mapUSerListEntityToUserListDTO(List<User>userList){
//		return userList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
//	}
//
//	public static List<RoomDTO>mapRoomListEntityToRoomListDTO(List<Room>roomList){
//		return roomList.stream().map(Utils::mapRoomEntityToRoomDTO).collect(Collectors.toList());
//	}
//	
//	public static List<BookingDTO>mapBookingListEntityToBookingListDTO(List<Booking>bookingList){
//		return bookingList.stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList());
//	}
//}
