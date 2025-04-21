package com.ecommerce.backend.service.authServices;

import com.ecommerce.backend.dtos.auth.response.LoginDto;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.*;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class CreateToken {
    private final static String SECRET = System.getenv("JWT_SECRET");

    public static String createToken(String username) throws JOSEException {
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(username)
                .claim("password", "hoi de lam chi")
                .issuer("MK")
                .expirationTime(new Date(System.currentTimeMillis() + 30 * 60 * 1000))
                .build();

        JWSSigner signer = new MACSigner(SECRET.getBytes(StandardCharsets.UTF_8));

        SignedJWT signedJWT = new SignedJWT(
                new JWSHeader(JWSAlgorithm.HS256),
                claimsSet);

        signedJWT.sign(signer);

        return signedJWT.serialize();
    }

    public static LoginDto decodeToken(String token) throws Exception {
        SignedJWT signedJWT = SignedJWT.parse(token);

        JWSVerifier verifier = new MACVerifier(SECRET.getBytes(StandardCharsets.UTF_8));

        if (signedJWT.verify(verifier)) {
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
            Date expirationTime = claims.getExpirationTime();

            if (expirationTime != null && new Date().after(expirationTime)) {
                throw new JOSEException("Expired token");
            }

            return new LoginDto(claims.getSubject(), claims.getStringClaim("password"));
        } else {
            throw new JOSEException("Wrong token");
        }
    }

    public static String verifyToken(String token) throws Exception {
        SignedJWT signedJWT = SignedJWT.parse(token);

        JWSVerifier verifier = new MACVerifier(SECRET.getBytes(StandardCharsets.UTF_8));

        if (signedJWT.verify(verifier)) {
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();

            return claims.getSubject();
        } else {
            throw new JOSEException("Wrong token");
        }

    }
}
