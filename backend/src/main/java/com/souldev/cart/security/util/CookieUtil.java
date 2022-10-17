package com.souldev.cart.security.util;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;


@Component
public class CookieUtil {

    public static void create(HttpServletResponse httpServletResponse, String name, String value, Boolean secure, Integer maxAge, String domain){
        ResponseCookie.ResponseCookieBuilder responseCookie =  ResponseCookie.fromClientResponse(name,value);
        responseCookie.maxAge(maxAge);
        responseCookie.secure(true);
        responseCookie.sameSite("None");
        responseCookie.path("/");
        responseCookie.httpOnly(true);
        httpServletResponse.setHeader("Set-Cookie",responseCookie.build().toString());
    }
    public static void clear(HttpServletResponse httpServletResponse, String name){
        ResponseCookie.ResponseCookieBuilder responseCookie =  ResponseCookie.fromClientResponse(name,"");
        responseCookie.maxAge(1);
        responseCookie.secure(true);
        responseCookie.sameSite("None");
        responseCookie.path("/");
        responseCookie.httpOnly(true);
        httpServletResponse.setHeader("Set-Cookie",responseCookie.build().toString());
    }
}
