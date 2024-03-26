package com.esprit.pi_project.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.security.Signature;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class jwtService {
    private static  final String SECRET_KEY="e04213d8d27529a27fc0f5ed053af0610f8b9a784ebc8551f07a6e8f6d7df540\n";

    public String extractemail(String token) {

        return extractClaim(token, Claims::getSubject);
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignkey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
public String issueToken(UserDetails userDetails){
        return issueToken(new HashMap<>(), userDetails);
}
public boolean isTokenValid (String token, UserDetails userDetails){
        final String email=extractemail(token);
        return (email.equals(userDetails.getUsername()));
}
public  boolean isTokenExpired (String token){
        return  extractExpired(token).before(new Date());
}

    private Date extractExpired(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String issueToken(
        Map<String,Object>otherclaims,
        UserDetails userDetails
){
        return Jwts
                .builder()
                .setClaims(otherclaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+ 1000 * 60 * 24))
                .signWith(getSignkey(), SignatureAlgorithm.HS256).
                compact();
}
    private Key getSignkey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
