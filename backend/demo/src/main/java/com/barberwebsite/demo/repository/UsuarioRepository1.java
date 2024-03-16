package com.barberwebsite.demo.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.lang.Nullable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.barberwebsite.demo.model.Barber;
import com.barberwebsite.demo.model.Client;
import com.barberwebsite.demo.model.Userr;


@Repository
public interface UsuarioRepository1 extends JpaRepository<Userr, Integer> {
    
    @Nullable
    UserDetails findByUsername(String user);
    Barber findBarberById(Integer id);
    Client findClientById(Integer id);
    Client findClientByUsername (String user);
    Barber findBarberByUsername (String user);
}
