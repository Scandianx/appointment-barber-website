package com.barberwebsite.demo.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.barberwebsite.demo.repository.UsuarioRepository1;



@Service
public class AuthorizationService implements UserDetailsService {

    @Autowired
    UsuarioRepository1 repository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByUsername(username);
        
    }
}

