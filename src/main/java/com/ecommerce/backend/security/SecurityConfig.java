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

@Configuration
@EnableWebSecurity
public class SecurityConfig {	
	private final CustomAccountDetailService accountDetailService;

	public SecurityConfig(CustomAccountDetailService accountDetailService) {
		this.accountDetailService = accountDetailService;
	}

	@Autowired
	private JwtFilter jwtFilter;

		@Bean
		public CorsConfigurationSource corsConfigurationSource() {
				CorsConfiguration configuration = new CorsConfiguration();
				configuration.setAllowedOrigins(List.of("*"));
				configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
				configuration.setAllowedHeaders(List.of("*"));
				configuration.setAllowCredentials(true);

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
												.requestMatchers("/", "/api/auth/**", "/login", "/error")
												.permitAll()
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
