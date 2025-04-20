package com.ecommerce.backend.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.model.Account;
import com.ecommerce.backend.repository.AccountRepository;

@Service
public class CustomAccountDetailService implements UserDetailsService{
	private final AccountRepository accountRepository;

	
	public CustomAccountDetailService(AccountRepository accountRepository) {
		this.accountRepository = accountRepository;
	}

	//load account by username
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Account account = accountRepository.findByUsername(username)
					.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		return new User(account.getUsername(), 
										account.getPassword(), 
										getAuthorities(account.getRole()));
	}

	public Collection<? extends GrantedAuthority> getAuthorities(String role) {
		return List.of(new SimpleGrantedAuthority(role));
	}	
}
