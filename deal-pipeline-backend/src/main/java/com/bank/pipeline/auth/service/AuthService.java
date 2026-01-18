package com.bank.pipeline.auth.service;

import com.bank.pipeline.auth.dto.LoginRequest;
import com.bank.pipeline.auth.dto.LoginResponse;
import com.bank.pipeline.auth.util.JwtUtil;
import com.bank.pipeline.user.model.User;
import com.bank.pipeline.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isActive())
            throw new RuntimeException("User inactive");

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
            throw new RuntimeException("Invalid password");

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

        return new LoginResponse(
                user.getId(),
                user.getUsername(),
                user.getRole().name(),
                token
        );
    }
}

