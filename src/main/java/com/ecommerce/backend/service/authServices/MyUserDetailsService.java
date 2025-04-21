package com.ecommerce.backend.service.authServices;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ecommerce.backend.model.Account;
import com.ecommerce.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(account.getRole()));

        return new org.springframework.security.core.userdetails.User(account.getUsername(), account.getPassword(),
                authorities);
    }

    public Optional<Account> getAccount(String username) {
        return accountRepository.findByUsername(username);
    }

    public Account insert(Account user){
        return accountRepository.save(user);
    }
}