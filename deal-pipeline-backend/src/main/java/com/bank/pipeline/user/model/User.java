package com.bank.pipeline.user.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.bank.pipeline.user.model.Role;

import java.time.Instant;


@Document(collection = "users")
@Data
public class User {

    @Id
    private String id;

    private String username;
    private String email;
    private String password;

    private Role role;
    private boolean active;
    private Instant createdAt;

}
