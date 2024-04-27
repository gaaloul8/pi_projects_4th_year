package com.esprit.pi_project.config;

import com.esprit.pi_project.dao.TokenDao;
import com.esprit.pi_project.services.jwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;



import java.io.IOException;
@Component
@RequiredArgsConstructor
public class JwtAuthentifcationFilter extends OncePerRequestFilter {
    private final jwtService jwtservice;
    @Autowired

    private UserDetailsService userDetailsService;

    @Autowired
    private TokenDao tokenDao;



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
            final String authHeader = request.getHeader("Authorization");
            final String jwt;
            final String email;
            if (authHeader == null || !authHeader.startsWith("Bearer")) {
            filterChain.doFilter(request,response);
            return;
            }
            jwt= authHeader.substring(7);
            email= jwtservice.extractemail(jwt);
            if (email != null && SecurityContextHolder.getContext().getAuthentication()== null){
                UserDetails userDetails= this.userDetailsService.loadUserByUsername(email);
                var isTokenValid = tokenDao.findByToken(jwt)
                        .map(t -> !t.isExpired() && !t.isRevoked())
                        .orElse(false);
                System.out.print(isTokenValid +"now" );
                System.out.print(jwtservice.isTokenValid(jwt,userDetails));
                //System.out.print("now");
                if (jwtservice.isTokenValid(jwt, userDetails) && isTokenValid) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    filterChain.doFilter(request,response);
                } else {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                }


            }
            }

    }

