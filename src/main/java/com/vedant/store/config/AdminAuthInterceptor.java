package com.vedant.store.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.servlet.HandlerInterceptor;

public class AdminAuthInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler
    ) throws Exception {

        HttpSession session = request.getSession(false);

        boolean loggedIn = session != null
                && Boolean.TRUE.equals(session.getAttribute("LOGGED_IN_ADMIN"));

        if (!loggedIn) {
            response.sendRedirect("/login");
            return false; // ❌ stop request
        }

        return true; // ✅ allow request
    }
}
