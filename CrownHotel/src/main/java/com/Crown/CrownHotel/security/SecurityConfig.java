package com.Crown.CrownHotel.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.Crown.CrownHotel.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {}) // ✅ enables CORS config from CorsConfig
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth
                // ✅ Open endpoints — no token required
                .requestMatchers(
                		 "/auth/**",
                		    "/rooms/**",
                		    "/bookings/**",
                		    "/api/files/**",
                		    "/api/images/**"
                ).permitAll()
                // ✅ All other routes require authentication
                .anyRequest().authenticated()
            )
            .authenticationProvider(authenticationProvider())
            // ✅ The JWT filter should be before UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(customUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}


















//package com.Crown.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import com.Crown.service.CustomUserDetailsService;
//
//@Configuration
//@EnableMethodSecurity
//@EnableWebSecurity
//public class SecurityConfig {
//	
//	@Autowired
//	private CustomUserDetailsService customUserDetailsService;
//	
//	@Autowired
//	private JWTAuthFilter jwtAuthFilter;
//	
//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity)throws Exception{
//		httpSecurity.csrf(AbstractHttpConfigurer::disable)
//		.cors(Customizer.withDefaults())
//		.authorizeHttpRequests(request -> request
//				.requestMatchers("/auth/**","/room/**","/bookings/**", "/api/files/**","/api/images/upload", "/api/images/delete").permitAll()
//				.anyRequest().authenticated())
//		.sessionManagement(manger ->manger.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//		.authenticationProvider(authenticationProvider())
//		.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
//		
//		return httpSecurity.build();
//		
//	}
//	
//	@Bean
//	public AuthenticationProvider authenticationProvider() {
//	DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
//	daoAuthenticationProvider.setUserDetailsService(customUserDetailsService);
//	daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
//	return daoAuthenticationProvider;
//	
//	}
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		
//		return new BCryptPasswordEncoder();
//	}
//	
//	@Bean
//	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
//	
//		return authenticationConfiguration.getAuthenticationManager();
//	}
//}



















