package com.maziakowskiadam.databaseservice.security;

import com.kastkode.springsandwich.filter.api.BeforeHandler;
import com.kastkode.springsandwich.filter.api.Flow;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JwtTokenFilter implements BeforeHandler {

    @Override
    public Flow handle(
            HttpServletRequest req,
            HttpServletResponse res,
            HandlerMethod handlerMethod,
            String[] strings) throws Exception {
        String token = this.getToken(req);
        if (token == null) {
            res.setStatus(401);
            return Flow.HALT;
        }


        // todo: Finish auth
        System.out.println("I will auth this req");
        return Flow.CONTINUE;
    }

    private String getToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }

        return  null;
    }

}
