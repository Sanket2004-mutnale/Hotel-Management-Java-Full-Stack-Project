package com.Crown.CrownHotel.security;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.Crown.CrownHotel.service.CustomUserDetailsService;
import com.Crown.CrownHotel.utils.JWTUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    // ✅ Endpoints that should bypass JWT validation
    private static final List<String> EXCLUDED_PATHS = List.of(
    		  "/auth",
    		    "/rooms",
    		    "/bookings",
    		    "/api/files",
    		    "/api/images"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestPath = request.getRequestURI();

        // ✅ Skip JWT validation for public endpoints
        if (EXCLUDED_PATHS.stream().anyMatch(requestPath::startsWith)) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(userEmail);

            if (jwtUtils.isValidToken(jwtToken, userDetails)) {
                SecurityContext context = SecurityContextHolder.createEmptyContext();
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                context.setAuthentication(authToken);
                SecurityContextHolder.setContext(context);
            }
        }

        filterChain.doFilter(request, response);
    }
}







//package com.Crown.security;
//
//import java.io.IOException;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.CachingUserDetailsService;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import com.Crown.utils.JWTUtils;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//@Component
//public class JWTAuthFilter extends OncePerRequestFilter{
//	
//	@Autowired
//	private JWTUtils jwtUtils;
//	
//	@Autowired
//	private CachingUserDetailsService cachingUserDetailsService;
//
//	@Override
//	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//			throws ServletException, IOException {
//	
//		final String authHeader = request.getHeader("Authorization");
//		
//		final String jwtToken;
//		final String userEmail;
//		
//		if(authHeader==null || authHeader.isBlank()) {
//			filterChain.doFilter(request, response);
//			return;
//		}
//		
//		jwtToken = authHeader.substring(7);
//		
//		userEmail = jwtUtils.extractUsername(jwtToken);
//		
//		if(userEmail!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
//			UserDetails userDetails = cachingUserDetailsService.loadUserByUsername(userEmail);
//			
//			if(jwtUtils.isValidToken(jwtToken, userDetails)) {
//				SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
//				UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails, userDetails.getAuthorities(), null);
//				token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//				securityContext.setAuthentication(token);
//				SecurityContextHolder.setContext(securityContext);
//			}
//		}
//		filterChain.doFilter(request, response);
//		
//	}
//
//}
