package com.barberwebsite.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.barberwebsite.demo.model.Client;



@Repository
public interface ProdutoRepository1 extends JpaRepository<Client, Integer> {
    
}