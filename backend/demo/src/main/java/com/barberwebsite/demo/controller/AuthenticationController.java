package com.barberwebsite.demo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barberwebsite.demo.model.Barber;
import com.barberwebsite.demo.model.Client;
import com.barberwebsite.demo.model.Userr;
import com.barberwebsite.demo.repository.UsuarioRepository1;
import com.barberwebsite.demo.security.AuthenticationDTO;
import com.barberwebsite.demo.security.LoginResponseDTO;
import com.barberwebsite.demo.security.RegisterDTO;
import com.barberwebsite.demo.security.TokenService;

import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin("*")
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UsuarioRepository1 repository;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        if (repository.findByUsername(data.username()).getClass() == Barber.class) {
            var token = tokenService.generateToken((Barber) auth.getPrincipal());
            System.out.println("login efetuado!");
            return ResponseEntity.ok(new LoginResponseDTO(token));
        } else {
            var token = tokenService.generateToken((Client) auth.getPrincipal());
            System.out.println("login efetuado!");
            return ResponseEntity.ok(new LoginResponseDTO(token));
        }

    }

    @PostMapping("/register")
    public Userr register(@RequestBody @Valid RegisterDTO data) {
        if (this.repository.findByUsername(data.username()) != null)
            return new Userr();
        if (data.userType().equals("barber")) {
            String eP = new BCryptPasswordEncoder().encode(data.password());
            Barber barber = new Barber(data.username(), eP, data.role(), data.name(), data.phoneNumber());
            repository.save(barber);
            return barber;
        } else {
            String eP = new BCryptPasswordEncoder().encode(data.password());
            Client client = new Client(data.username(), eP, data.role(), data.name(), data.phoneNumber());
            repository.save(client);
            return client;
        }

    }

}
