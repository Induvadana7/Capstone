package com.bank.pipeline.user.service;
import com.bank.pipeline.user.dto.UserMeResponse;
import com.bank.pipeline.user.model.User;
import com.bank.pipeline.user.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(Instant.now());
        return userRepository.save(user);
    }

    public User updateStatus(String id, boolean active) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setActive(active);
        return userRepository.save(user);
    }

    public List<UserMeResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(u -> new UserMeResponse(
                        u.getId(),
                        u.getUsername(),
                        u.getEmail(),
                        u.getRole().name(),
                        u.isActive()
                ))
                .toList();
    }


}
