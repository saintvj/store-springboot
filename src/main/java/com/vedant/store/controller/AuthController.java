package com.vedant.store.controller;

import com.vedant.store.config.AdminConfig;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AuthController {

    private final AdminConfig adminConfig;

    public AuthController(AdminConfig adminConfig) {
        this.adminConfig = adminConfig;
    }

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
            HttpSession session,
            Model model
    ) {
        if (!adminConfig.authenticate(username, password)) {
            model.addAttribute("error", "Invalid credentials");
            return "login";
        }

        // ✅ Create session
        session.setAttribute("LOGGED_IN_ADMIN", true);

        return "redirect:/admin";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
