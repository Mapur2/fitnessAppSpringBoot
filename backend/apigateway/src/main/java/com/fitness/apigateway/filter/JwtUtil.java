package com.fitness.apigateway.filter;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;

@Component
public class JwtUtil {


    public static final String SECRET = "KbZgx+9oVJ4PvW4byHz7rZ2EyRHg1mHGzVCPOBAvkmI=";


    public void validateToken(final String token) {
        Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parse(token);
    }



    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET));
    }
}
