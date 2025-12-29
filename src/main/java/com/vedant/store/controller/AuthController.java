package com.vedant.store.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AuthController {

    // TEMP credentials (MVP)
    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "admin123";

    @GetMapping("/login")
    public String loginPage(
            @RequestParam(required = false) String error,
            Model model
    ) {
        if (error != null) {
            model.addAttribute("error", true);
        }
        return "login";
    }

    @PostMapping("/login")
    public String handleLogin(
            @RequestParam String username,
            @RequestParam String password,
            HttpSession session
    ) {

        if (ADMIN_USERNAME.equals(username)
                && ADMIN_PASSWORD.equals(password)) {

            // ✅ Create session
            session.setAttribute("LOGGED_IN_ADMIN", true);

            return "redirect:/admin";
        }

        // ❌ Login failed
        return "redirect:/login?error=true";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
