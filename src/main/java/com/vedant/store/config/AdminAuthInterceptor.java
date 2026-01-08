package com.vedant.store.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AdminAuthInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler
    ) throws Exception {

        HttpSession session = request.getSession(false);

        // Check if admin is logged in
        if (session != null && Boolean.TRUE.equals(session.getAttribute("LOGGED_IN_ADMIN"))) {
            return true; // ✅ allow request
        }

        // ❌ not logged in → redirect to login
        response.sendRedirect("/login");
        return false; // stop request
    }
}
