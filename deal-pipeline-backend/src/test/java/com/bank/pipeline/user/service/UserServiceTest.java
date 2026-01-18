package com.bank.pipeline.user.service;
import com.bank.pipeline.user.model.Role;
import com.bank.pipeline.user.model.User;
import com.bank.pipeline.user.repository.UserRepository;
import com.bank.pipeline.user.service.UserService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void createUser_shouldHashPassword_andSetCreatedAt() {

        User input = new User();
        input.setUsername("u1");
        input.setEmail("u1@bank.com");
        input.setPassword("1234");
        input.setRole(Role.USER);
        input.setActive(true);

        when(passwordEncoder.encode("1234")).thenReturn("HASHED");
        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        User saved = userService.createUser(input);

        assertEquals("HASHED", saved.getPassword());
        assertNotNull(saved.getCreatedAt());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void updateStatus_shouldUpdateActive() {

        User u = new User();
        u.setId("1");
        u.setActive(true);

        when(userRepository.findById("1")).thenReturn(Optional.of(u));
        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        User updated = userService.updateStatus("1", false);

        assertFalse(updated.isActive());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void updateStatus_shouldThrow_whenNotFound() {

        when(userRepository.findById("x")).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> userService.updateStatus("x", false));

        assertEquals("User not found", ex.getMessage());
    }
}

