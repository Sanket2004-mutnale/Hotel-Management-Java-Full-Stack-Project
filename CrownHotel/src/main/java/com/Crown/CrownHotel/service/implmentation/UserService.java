package com.Crown.CrownHotel.service.implmentation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Crown.CrownHotel.dto.LoginRequest;
import com.Crown.CrownHotel.dto.Response;
import com.Crown.CrownHotel.dto.UserDTO;
import com.Crown.CrownHotel.entity.User;
import com.Crown.CrownHotel.exception.OurException;
import com.Crown.CrownHotel.repository.UserRepository;
import com.Crown.CrownHotel.service.interfac.IUserService;
import com.Crown.CrownHotel.utils.JWTUtils;
import com.Crown.CrownHotel.utils.Utils;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public Response register(User user) {
        Response response = new Response();
        try {
            if (user.getRole() == null || user.getRole().isBlank()) {
                user.setRole("USER");
            }

            if (userRepository.existsByEmail(user.getEmail())) {
                throw new OurException(user.getEmail() + " already exists");
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);

            response.setStatusCode(200);
            response.setMessage("User registered successfully");
            response.setUser(userDTO);

        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during user registration: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response login(LoginRequest loginRequest) {
        Response response = new Response();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            var user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new OurException("User not found"));

            String jwt = jwtUtils.generateToken(user); // ✅ use JWT, not random UUID

            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setExpirationTime("7 days");
            response.setMessage("Login successful");

        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during user login: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllUser() {
        Response response = new Response();

        try {
            List<User> userList = userRepository.findAll();
            List<UserDTO> userDTOList = Utils.mapUserListEntityToUserListDTO(userList);

            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setUserList(userDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error fetching all users: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserBookingHistory(Long userId) {
        Response response = new Response();

        try {
            User user = userRepository.findById(Long.valueOf(userId))
                    .orElseThrow(() -> new OurException("User not found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTOPlusUserBookingsAndRoom(user);

            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setUser(userDTO);

        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error fetching user booking history: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteUser(Long userId) {
        Response response = new Response();

        try {
            userRepository.findById(Long.valueOf(userId))
                    .orElseThrow(() -> new OurException("User not found"));
            userRepository.deleteById(Long.valueOf(userId));

            response.setStatusCode(200);
            response.setMessage("User deleted successfully");

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error deleting user: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserById(Long userId) {
        Response response = new Response();

        try {
            User user = userRepository.findById(Long.valueOf(userId))
                    .orElseThrow(() -> new OurException("User not found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);

            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setUser(userDTO);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error fetching user by ID: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getMyInfo(String email) {
        Response response = new Response();

        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new OurException("User not found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);

            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setUser(userDTO);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error fetching user info: " + e.getMessage());
        }
        return response;
    }
}










//package com.Crown.CrownHotel.service.implmentation;
//
//import java.util.List;
//import java.util.UUID;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.Crown.CrownHotel.dto.LoginRequest;
//import com.Crown.CrownHotel.dto.Response;
//import com.Crown.CrownHotel.dto.UserDTO;
//import com.Crown.CrownHotel.entity.User;
//import com.Crown.CrownHotel.exception.OurException;
//import com.Crown.CrownHotel.repository.UserRepository;
//import com.Crown.CrownHotel.service.interfac.IUserService;
//import com.Crown.CrownHotel.utils.JWTUtils;
//import com.Crown.CrownHotel.utils.Utils;
//
//@Service
//public class UserService implements IUserService {
//
//	@Autowired
//	private UserRepository userRepository;
//	
//	@Autowired
//	private PasswordEncoder passwordEncoder;
//	
//	@Autowired
//	private JWTUtils jwtUtils;
//	
//	@Autowired
//	private AuthenticationManager authenticationManager;
//	
//	@Override
//	public Response register(User user) {
//		Response response =new Response();
//		try {
//			if(user.getRole()==null || user.getRole().isBlank()) {
//				user.setRole("USER");
//				
//			}
//			
//			if(userRepository.existsByEmail(user.getEmail())) {
//				throw new OurException(user.getEmail()+"Already Exists");
//			}
//			user.setPassword(passwordEncoder.encode(user.getPassword()));
//			User savedUser = userRepository.save(user);
//			UserDTO userDTO =Utils.mapUserEntityToUserDTO(savedUser);
//			response.setStatusCode(200);
//			response.setUser(userDTO);
//			
//		}
//		catch(OurException e) {
//			response.setStatusCode(400);
//			response.setMessage(e.getMessage());
//			
//		}
//		catch(Exception e) {
//			response.setStatusCode(500);
//			response.setMessage("Error Occured During User Registration "+e.getMessage());
//		}
//		return response;
//	}
//
//	@Override
//	public Response login(LoginRequest logingRequest) {
//		
//		
//		Response response =new Response();
//		
//		try {
//			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(logingRequest.getEmail(),logingRequest.getPassword()));
//			var user= userRepository.findByEmail(logingRequest.getEmail()).orElseThrow(()->new OurException("user Not Found"));
//			
//			String token = UUID.randomUUID().toString();
//			
//			var  jwt =jwtUtils.generateToken(user);
//			response.setStatusCode(200);
//			response.setToken(token);
//			response.setRole(user.getRole());
//			response.setExpirationTime("7 days");
//			response.setMessage("successful");
//		}
//		catch(OurException e) {
//			response.setStatusCode(400);
//			response.setMessage(e.getMessage());
//		}
//		catch(Exception e) {
//			response.setStatusCode(500);
//			response.setMessage("Error Occured During User Login "+e.getMessage());
//		}
//		return response;
//	}
//
//	@Override
//	public Response getAllUser() {
//		Response response =new Response();
//		
//		try {
//			
//			List<User> userList = userRepository.findAll();
//			List<UserDTO>userDTOList = Utils.mapUSerListEntityToUserListDTO(userList);
//			response.setStatusCode(200);
//			response.setMessage("successful");
//			response.setUserList(userDTOList);
//			
//		}
//		
//		catch(Exception e) {
//			response.setStatusCode(500);
//			response.setMessage("Error getting all user "+e.getMessage());
//		}
//		
//		
//		return response;
//	}
//
//	@Override
//	public Response getUserBookingHistory(String userId) {
//		
//		Response response =new Response();
//		
//		try {
//			User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new OurException("User Not Found"));
//			UserDTO userDTO = Utils.mapUserEntityToUserDTOPluaUserBookingsAndRoom(user);
//			
//			response.setStatusCode(200);
//			response.setMessage("successful");
//			response.setUser(userDTO);
//			
//		}
//		catch(OurException e) {
//			response.setStatusCode(400);
//			response.setMessage(e.getMessage());
//		}
//		catch(Exception e) {
//			response.setStatusCode(500);
//			response.setMessage("Error getting all user "+e.getMessage());
//			
//		}
//		return response;
//	}
//
//	@Override
//	public Response deleteUser(String userId) {
//		
//		Response response =new Response();
//		
//		try {
//			userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new OurException("User Not Found"));
//		    userRepository.deleteById(Long.valueOf(userId));
//			
//			response.setStatusCode(200);
//			response.setMessage("successful");
//			
//		}
//		catch(OurException e) {
//			response.setStatusCode(404);
//			response.setMessage(e.getMessage());
//		}
//		catch(Exception e) {
//			response.setStatusCode(500);
//			response.setMessage("Error getting all user "+e.getMessage());
//			
//		}
//		return response;
//	}
//
//	@Override
//	public Response getUserById(String userId) {
//		Response response =new Response();
//		
//		try {
//			User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new OurException("User Not Found"));
//		    UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
//			response.setStatusCode(200);
//			response.setMessage("successful");
//			response.setUser(userDTO);
//			
//		}
//		catch(OurException e) {
//			response.setStatusCode(404);
//			response.setMessage(e.getMessage());
//		}
//		catch(Exception e) {
//			response.setStatusCode(500);
//			response.setMessage("Error getting all user "+e.getMessage());
//			
//		}
//		return response;
//	}
//
//	@Override
//	public Response getMyInfo(String email) {
//		
//		Response response =new Response();
//		
//		try {
//			User user = userRepository.findById(Long.valueOf(email)).orElseThrow(()-> new OurException("User Not Found"));
//		    UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
//			response.setStatusCode(200);
//			response.setMessage("successful");
//			response.setUser(userDTO);
//			
//		}
//		catch(OurException e) {
//			response.setStatusCode(404);
//			response.setMessage(e.getMessage());
//		}
//		catch(Exception e) {
//			response.setStatusCode(500);
//			response.setMessage("Error getting all user "+e.getMessage());
//			
//		}
//		return response;
//	}
//
//}
