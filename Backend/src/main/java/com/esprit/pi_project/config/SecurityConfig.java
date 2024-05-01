package com.esprit.pi_project.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import static com.esprit.pi_project.entities.Permission.ADMIN_READ;
import static com.esprit.pi_project.entities.Role.Admin;
import static com.esprit.pi_project.entities.Role.User;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    private final JwtAuthentifcationFilter jwtFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/auth/**","/profile/","/auth/reset-password/").permitAll()

                                .requestMatchers("/event/**","/reservation/**","/feedback/**").permitAll()




                          //      .requestMatchers("/quiz/**","/passerQuiz/**","/questionq/**","/activity/**","/option/**").permitAll()



                             //   .requestMatchers("/feedback/**").hasAnyRole(User.name())
                             //   .requestMatchers("/auth/**").hasAnyRole(Admin.name())
                               // .requestMatchers(HttpMethod.GET,"/auth/admin").hasAnyAuthority(ADMIN_READ.name())
                                .anyRequest().authenticated()
                )
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                        .addLogoutHandler(logoutHandler)
                        .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                        .logoutUrl("/auth/logout"));

        return http.build();
    }

}
