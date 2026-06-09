package com.Crown.CrownHotel.service.interfac;

import com.Crown.CrownHotel.dto.LoginRequest;
import com.Crown.CrownHotel.dto.Response;
import com.Crown.CrownHotel.entity.User;

public interface IUserService {
	Response register(User logingRequest);
	
	Response login(LoginRequest logingRequest);
	
	Response getAllUser();
	
	Response getUserBookingHistory(Long userId);
	
	Response deleteUser(Long userId);
	
	Response getUserById(Long userId);
	
	Response getMyInfo(String email);

}
