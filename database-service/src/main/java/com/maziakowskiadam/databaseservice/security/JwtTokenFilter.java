package com.maziakowskiadam.databaseservice.security;

import com.kastkode.springsandwich.filter.api.BeforeHandler;
import com.kastkode.springsandwich.filter.api.Flow;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.impl.DefaultClaims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;

@Component
public class JwtTokenFilter implements BeforeHandler {

    @Autowired
    private JwtConfig jwtConfig;

    @Override
    public Flow handle(
            HttpServletRequest req,
            HttpServletResponse res,
            HandlerMethod handlerMethod,
            String[] flags) {

        String token = this.getToken(req);
        if (token == null) {
            res.setStatus(401);
            return Flow.HALT;
        }

        byte[] bytesArr = this.jwtConfig.getJwtKey().getBytes();
        SecretKey secretKey = new SecretKeySpec(bytesArr,0,bytesArr.length,"AES");

        try {
            DefaultClaims tokenBody = (DefaultClaims) Jwts.parser()
                    .setSigningKey(secretKey)
                    .parse(token)
                    .getBody();

            String role = tokenBody.get("UserRole", String.class);

            List<String> requiredRoles = Arrays.asList(flags);
            if (requiredRoles.contains(role)) {
                return Flow.CONTINUE;
            }
        } catch (Exception ex)
        {
            res.setStatus(401);
            return Flow.HALT;
        }

        res.setStatus(401);
        return Flow.HALT;
    }

    private String getToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return  null;
    }

}
