package com.ecommerce.backend.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import vn.payos.PayOS;

@Configuration
public class PayOSConfig {

    @Bean
    public PayOS payOS() {
        Dotenv dotenv = Dotenv.configure().load();

        String clientId = dotenv.get("PAYOS_CLIENT_ID");
        String apiKey = dotenv.get("PAYOS_API_KEY");
        String checksumKey = dotenv.get("PAYOS_CHECKSUM_KEY");

        return new PayOS(clientId, apiKey, checksumKey);
    }
}
