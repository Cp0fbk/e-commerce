package com.ecommerce.backend.security;

import java.util.List;

import com.ecommerce.backend.component.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {	
	@Autowired
	private JwtFilter jwtFilter;

		@Bean
		public CorsConfigurationSource corsConfigurationSource() {
				CorsConfiguration configuration = new CorsConfiguration();
				configuration.setAllowedOrigins(List.of("http://localhost:3000",
						"https://techspherehcmut.netlify.app"));
				configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
				configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With", "Accept", "Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"));
				configuration.setExposedHeaders(List.of("Authorization", "Content-Type"));
				configuration.setAllowCredentials(true);
				configuration.setMaxAge(3600L);
		
				UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
				source.registerCorsConfiguration("/**", configuration);
				return source;
		}

		@Bean
		public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
			http
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.csrf(AbstractHttpConfigurer::disable) // Vô hiệu hóa CSRF (REST API không cần CSRF)
				.sessionManagement(session -> session
												.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless
				.authorizeHttpRequests(auth -> auth
												// Các endpoint không yêu cầu xác thực
												.requestMatchers("/", "/api/auth/**", "/login", "/register", "/error",
													"/v3/api-docs/**", "/swagger-ui/**", "/swagger-resources/**", "/webjars/**", "/swagger-ui.html")
													.permitAll()
												.requestMatchers("/api/webhook/**", "/api/payment/success", "/api/payment/cancel", "/api/categories/all",
														"/api/products/all", "/api/products/filter", "/api/products/**", "/api/images/upload",
														"/api/promotions/all", "/api/promotions/onDate", "/api/images/product-line/**").permitAll()
												// Các endpoint khác yêu cầu xác thực
												.anyRequest().authenticated())
												.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
			return http.build();
		}

		@Bean
		public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
			return authenticationConfiguration.getAuthenticationManager();
		}

		@Bean
		PasswordEncoder passwordEncoder() {
			return new BCryptPasswordEncoder();
		}
}