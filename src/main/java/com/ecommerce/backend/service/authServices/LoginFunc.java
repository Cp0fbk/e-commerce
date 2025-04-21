package com.ecommerce.backend.service.authServices;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;

public class LoginFunc {
    public static void setCookie(String username, HttpServletResponse res) throws Exception {
        String token = CreateToken.createToken(username);

        ResponseCookie cookie = ResponseCookie.from("token", token)
                .path("/")
                .httpOnly(true)
                .secure(true)
                .maxAge(60 * 60 * 13)
                .build();

        String cookieHeader = cookie.toString() + "; SameSite=None";
//        Cookie cookie = new Cookie("token", token);
//        cookie.setHttpOnly(true);
//        cookie.setSecure(false);
//        cookie.setPath("/");
//        cookie.setMaxAge(60 * 60 * 13);

        res.setHeader(HttpHeaders.SET_COOKIE, cookieHeader);
    }
}
