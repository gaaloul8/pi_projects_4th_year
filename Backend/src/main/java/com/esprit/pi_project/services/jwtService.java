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
    private static  final long accesexpired= 86400000;
    private static  final long refreshexpired= 604800000;


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

    public String issueToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return issueToken(extraClaims, userDetails, accesexpired);
    };

    public String issueRefreshToken(
            UserDetails userDetails
    ) {
        return issueToken(new HashMap<>(), userDetails, refreshexpired);
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


    private Key getSignkey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    private String issueToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expierd
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expierd))
                .signWith(getSignkey(), SignatureAlgorithm.HS256)
                .compact();
    }
}
