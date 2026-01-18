package com.bank.pipeline.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserMeResponse {
    private String id;
    private String username;
    private String email;
    private String role;
    private boolean active;
}
