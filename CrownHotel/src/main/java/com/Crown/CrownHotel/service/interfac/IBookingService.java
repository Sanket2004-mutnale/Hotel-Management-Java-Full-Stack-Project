package com.Crown.CrownHotel.service.interfac;

import com.Crown.CrownHotel.dto.Response;
import com.Crown.CrownHotel.entity.Booking;

public interface IBookingService {

	Response saveBooking(Long roomId,Long userId,Booking bookingRequest);
	
	Response findBookingByConfirmationCode(String confirmationCode);
	
	Response getAllBooking();
	
	Response cancelBooking(Long bookingId);
}
