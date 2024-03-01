package com.barberwebsite.demo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.barberwebsite.demo.model.Userr;

import com.barberwebsite.demo.security.AuthenticationDTO;
import com.barberwebsite.demo.security.LoginResponseDTO;
import com.barberwebsite.demo.security.RegisterDTO;

import com.barberwebsite.demo.service.AuthenticationService;

import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin("*")
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO data) {
        return authenticationService.login(data);

    }

    @PostMapping("/register")
    public Userr register(@RequestBody @Valid RegisterDTO data) {
        return authenticationService.register(data);

    }

}
