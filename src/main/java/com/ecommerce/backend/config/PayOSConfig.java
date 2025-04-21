package com.ecommerce.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import vn.payos.PayOS;

@Configuration
public class PayOSConfig {

    @Bean
    public PayOS payOS() {
        String clientId = "YOUR_CLIENT_ID";
        String apiKey = "YOUR_API_KEY";
        String checksumKey = "YOUR_CHECKSUM_KEY";

        return new PayOS(clientId, apiKey, checksumKey);
    }
}
