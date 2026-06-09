package com.Crown.CrownHotel.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("*") // ✅ better than allowedOrigins("*") for Spring Boot 3+
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .exposedHeaders("Authorization") // ✅ allows frontend/postman to see JWT header
                        .allowCredentials(true); // ✅ must be true if you send cookies or auth headers
            }
        };
    }
}

















//package com.Crown.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//
//@Configuration
//public class CorsConfig {
//	
//	@Bean
//	public WebMvcConfigurer webMvcConfigurer() {
//		return new WebMvcConfigurer() {
//			
//			public void addCorsMapping (CorsRegistry registry) {
//				WebMvcConfigurer.super.addCorsMappings(registry);
//				registry.addMapping("/**")
//				.allowedMethods("GET","POST","PUT","DELETE")
//				.allowedOrigins("*");
//			}
//			
//		};
//	}
//
//}
