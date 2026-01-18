package com.bank.pipeline.user.controller;
import com.bank.pipeline.user.dto.UserMeResponse;
import com.bank.pipeline.user.model.User;
import com.bank.pipeline.user.repository.UserRepository;
import com.bank.pipeline.user.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final UserService userService;

    public AdminUserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<UserMeResponse> getAllUsers() {
        return userService.getAllUsers();
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/status")
    public User updateStatus(@PathVariable String id,
                             @RequestParam boolean active) {
        return userService.updateStatus(id, active);
    }
}

