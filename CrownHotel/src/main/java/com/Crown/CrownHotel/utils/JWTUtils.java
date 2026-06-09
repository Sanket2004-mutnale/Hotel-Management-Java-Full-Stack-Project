package com.Crown.CrownHotel.utils;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JWTUtils {

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7; // ✅ 7 days

    private final SecretKey key;

    public JWTUtils() {
        String secretString = "371678387327d878te82378278836gdt736476737838sgdh738732783egsgd838367873";
        // ✅ Don't base64-decode unless your secret is actually Base64
        byte[] keyBytes = secretString.getBytes(StandardCharsets.UTF_8);
        this.key = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(
                Jwts.parser()
                        .verifyWith(key)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload());
    }

    public boolean isValidToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }
}



//package com.Crown.CrownHotel.utils;
//
//import java.nio.charset.StandardCharsets;
//import java.util.Base64;
//import java.util.Date;
//import java.util.function.Function;
//
//import javax.crypto.SecretKey;
//import javax.crypto.spec.SecretKeySpec;
//
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//@Component
//public class JWTUtils {
//	
//	private static final long EXPIRATION_TIME = 1000*60*24*7; //FOR 7 DAYS
//	
//	private final SecretKey Key;
//	
//	public JWTUtils() {
//		
//		String secreteString ="371678387327d878te82378278836gdt736476737838sgdh738732783egsgd838367873";
//		byte[] keyBytes= Base64.getDecoder().decode(secreteString.getBytes(StandardCharsets.UTF_8));
//		this.Key=new SecretKeySpec(keyBytes,"HmacSHA256");
//	}
//	public String generateToken(UserDetails userDetails ) {
//		return Jwts.builder()
//				.subject(userDetails.getUsername())
//				.issuedAt(new Date(System.currentTimeMillis()))
//				.expiration(new Date (System.currentTimeMillis()+ EXPIRATION_TIME))
//				.signWith(Key)
//				.compact();
//	}
//
//	public String extractUsername(String token) {
//		return extractClaims(token,Claims::getSubject);
//	}
//	
//	private <T> T extractClaims(String token,Function<Claims ,T> claimsTFunction){
//		return claimsTFunction.apply(Jwts.parser().verifyWith(Key).build().parseSignedClaims(token).getPayload());
//		
//	}
//	
//	public boolean isValidToken(String token,UserDetails userDetalis) {
//		final String username=extractUsername(token);
//		return (username.equals(userDetalis.getUsername()) && !isTokenExpired(token));
//	}
//	
//	private boolean isTokenExpired(String token) {
//		return extractClaims(token,Claims::getExpiration).before(new Date());
//	}
//}
