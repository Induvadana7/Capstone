package com.bank.pipeline.auth.service;
import com.bank.pipeline.auth.dto.LoginRequest;
import com.bank.pipeline.auth.dto.LoginResponse;
import com.bank.pipeline.auth.util.JwtUtil;
import com.bank.pipeline.user.model.Role;
import com.bank.pipeline.user.model.User;
import com.bank.pipeline.user.repository.UserRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    @Test
    void login_shouldReturnToken_whenValid() {

        LoginRequest req = new LoginRequest();
        req.setUsername("admin");
        req.setPassword("admin123");

        User user = new User();
        user.setId("1");
        user.setUsername("admin");
        user.setPassword("HASH");
        user.setRole(Role.ADMIN);
        user.setActive(true);

        when(userRepository.findByUsername("admin")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("admin123", "HASH")).thenReturn(true);
        when(jwtUtil.generateToken("admin", "ADMIN")).thenReturn("TOKEN123");

        LoginResponse res = authService.login(req);

        assertEquals("1", res.getId());
        assertEquals("admin", res.getUsername());
        assertEquals("ADMIN", res.getRole());
        assertEquals("TOKEN123", res.getToken());
    }

    @Test
    void login_shouldThrow_whenUserNotFound() {

        LoginRequest req = new LoginRequest();
        req.setUsername("x");
        req.setPassword("y");

        when(userRepository.findByUsername("x")).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> authService.login(req));

        assertEquals("User not found", ex.getMessage());
    }

    @Test
    void login_shouldThrow_whenInactive() {

        LoginRequest req = new LoginRequest();
        req.setUsername("user");
        req.setPassword("1234");

        User user = new User();
        user.setUsername("user");
        user.setActive(false);

        when(userRepository.findByUsername("user")).thenReturn(Optional.of(user));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> authService.login(req));

        assertEquals("User inactive", ex.getMessage());
    }

    @Test
    void login_shouldThrow_whenPasswordWrong() {

        LoginRequest req = new LoginRequest();
        req.setUsername("user");
        req.setPassword("1234");

        User user = new User();
        user.setUsername("user");
        user.setPassword("HASH");
        user.setRole(Role.USER);
        user.setActive(true);

        when(userRepository.findByUsername("user")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("1234", "HASH")).thenReturn(false);

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> authService.login(req));

        assertEquals("Invalid password", ex.getMessage());
    }
}


