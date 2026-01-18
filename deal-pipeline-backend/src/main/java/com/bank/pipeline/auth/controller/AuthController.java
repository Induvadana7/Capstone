package com.bank.pipeline.auth.controller;

import com.bank.pipeline.auth.dto.LoginRequest;
import com.bank.pipeline.auth.dto.LoginResponse;
import com.bank.pipeline.auth.service.AuthService;
import com.bank.pipeline.auth.util.JwtUtil;
import com.bank.pipeline.user.model.User;
import com.bank.pipeline.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}




