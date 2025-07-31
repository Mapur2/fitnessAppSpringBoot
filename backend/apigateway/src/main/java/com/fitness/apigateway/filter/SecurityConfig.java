package com.fitness.apigateway.filter;

import com.fitness.apigateway.security.SecurityContextRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http,
                                                         JwtAuthenticationManager authManager,
                                                         SecurityContextRepository contextRepo) {
        return http
                .csrf(csrf -> csrf.disable())
                .authenticationManager(authManager)
                .securityContextRepository(contextRepo)
                .authorizeExchange(exchange -> exchange
                        .pathMatchers("/api/users/login", "/api/users/register", "/eureka/**").permitAll()
                        .anyExchange().authenticated()
                )
                .build();
    }
}
