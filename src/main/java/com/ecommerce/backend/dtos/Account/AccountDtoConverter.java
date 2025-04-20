package com.ecommerce.backend.dtos.Account;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ecommerce.backend.model.Account;

@Component
public class AccountDtoConverter {

	public AccountDto convert(Account from) {
		return new AccountDto(
				from.getAccountId(),
				from.getUsername(),
				from.getPassword(),
				from.getRole()
		);
	}

	public List<AccountDto> convert(List<Account> from) {
        return from.stream().map(this::convert).collect(Collectors.toList());
    }

    public Optional<AccountDto> convert(Optional<Account> from) {
        return from.map(this::convert);
    }

}
