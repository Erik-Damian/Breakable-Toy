package com.example.breakabletoy.cofig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow all origins, all methods, and all headers for all paths
        registry.addMapping("/**")
                .allowedOrigins("*")  // Allows all origins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS") // Allows all HTTP methods
                .allowedHeaders("*");  // Allows all headers
    }
}