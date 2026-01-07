package com.vedant.store.config;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminConfig {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // username stays plain
    private final String adminUsername = "admin";

    // hashed version of "admin123"
    private final String adminPasswordHash =
            encoder.encode("admin123");

    public boolean authenticate(String username, String rawPassword) {
        return adminUsername.equals(username)
                && encoder.matches(rawPassword, adminPasswordHash);
    }
}
