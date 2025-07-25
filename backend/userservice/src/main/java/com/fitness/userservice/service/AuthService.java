package com.fitness.userservice.service;

import com.fitness.userservice.config.JwtTokenProvider;
import com.fitness.userservice.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider provider;

    public boolean validateToken(String token){
        return provider.validateToken(token);
    }

    public String login(LoginDTO l){
        System.out.println("in auth service");
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(l.getEmail(),l.getPassword()));


        //SecurityContextHolder is used to allow the rest of the application to know that the use is logged in and use the data

        SecurityContextHolder.getContext().setAuthentication(authentication);

        //generate the toke based on username
        String token = provider.generateToken(authentication);
        return token;
    }

}