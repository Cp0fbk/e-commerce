package com.ecommerce.backend.helper;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class GetAccountIdHelper {
    public Integer getAccountId(HttpServletRequest request) {
        Integer id = (Integer) request.getAttribute("id");
        System.out.println(id);
        if (id == null || id == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is required");
        }
        return id;
    }
}
