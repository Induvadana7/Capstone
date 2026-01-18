package com.bank.pipeline.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println("BCrypt(admin123) = " + encoder.encode("admin123"));
        System.out.println("BCrypt(1234) = " + encoder.encode("1234"));
    }
}

