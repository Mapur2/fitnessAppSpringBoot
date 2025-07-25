package com.fitness.activityservice.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

//For making requests to UserService
@Configuration
public class WebClientConfig {
    @Bean
    @LoadBalanced
    public WebClient.Builder webClientBuilder(){
        return WebClient.builder();
    }

    @Bean
    public WebClient userServiceWebClient(WebClient.Builder builder){
        return webClientBuilder().baseUrl("http://user-service").build();
    }
}
