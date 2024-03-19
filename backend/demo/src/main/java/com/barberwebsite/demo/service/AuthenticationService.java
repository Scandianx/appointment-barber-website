package com.barberwebsite.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.barberwebsite.demo.model.Barber;
import com.barberwebsite.demo.model.Client;
import com.barberwebsite.demo.model.Userr;
import com.barberwebsite.demo.repository.UsuarioRepository1;
import com.barberwebsite.demo.security.AuthenticationDTO;
import com.barberwebsite.demo.security.LoginResponseDTO;
import com.barberwebsite.demo.security.RegisterDTO;
import com.barberwebsite.demo.security.TokenService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class AuthenticationService {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UsuarioRepository1 repository;
    @Autowired
    private TokenService tokenService;

    
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        if (repository.findByUsername(data.username()).getClass() == Barber.class) {
            var token = tokenService.generateToken((Barber) auth.getPrincipal());
            log.info("O usuario {} se logou no sistema", data.username());
            return ResponseEntity.ok(new LoginResponseDTO(token));
        } else {
            var token = tokenService.generateToken((Client) auth.getPrincipal());
            log.info("O usuario {} se logou no sistema", data.username());
            return ResponseEntity.ok(new LoginResponseDTO(token));
        }

    }

    
    public Userr register(@RequestBody @Valid RegisterDTO data) {
        if (this.repository.findByUsername(data.username()) != null)
            return null;
            log.info("Alguem tentou se registrar com um email ja registrado");
        if (data.userType().equals("barber")) {
            String eP = new BCryptPasswordEncoder().encode(data.password());
            Barber barber = new Barber(data.username(), eP, data.role(), data.name(), data.phoneNumber());
            barber = repository.save(barber);
            log.info("O usuario {} se registrou no sistema como barbeiro", barber.getId());
            return barber;
            
        } else {
            String eP = new BCryptPasswordEncoder().encode(data.password());
            Client client = new Client(data.username(), eP, data.role(), data.name(), data.phoneNumber());
            repository.save(client);
            log.info("O usuario {} se registrou no sistema como cliente", client.getId());
            return client;
        }

    }
}
