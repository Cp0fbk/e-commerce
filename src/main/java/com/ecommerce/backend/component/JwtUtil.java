package com.ecommerce.backend.component;

import com.ecommerce.backend.dtos.auth.response.LoginDto;
import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    Dotenv dotenv = Dotenv.configure().load();
    private final String SECRET = dotenv.get("JWT_SECRET");

    public String generateToken(LoginDto loginDto, Integer accountId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("accountId", accountId);
//        claims.put("email", email);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(loginDto.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30)) // 30 minutes
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)
                .compact();
    }


    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public Integer extractAccountId(String token) {
        return extractAllClaims(token).get("accountId", Integer.class);
    }
//
//    public String extractEmail(String token) {
//        return extractAllClaims(token).get("email", String.class);
//    }
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }
    public boolean isTokenExpired(String token) {
        Date expiration = extractAllClaims(token).getExpiration();
        return expiration.before(new Date());
    }
    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
        } catch (Exception e) {
            System.out.println("Token validation error: " + e.getMessage());
            return false;
        }
    }
}
