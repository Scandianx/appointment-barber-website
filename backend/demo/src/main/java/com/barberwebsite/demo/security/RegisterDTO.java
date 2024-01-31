package com.barberwebsite.demo.security;

import com.barberwebsite.demo.model.UserRole;

public record RegisterDTO(String username, String password, String phoneNumber, String name, String userType, UserRole role) {
    
}
