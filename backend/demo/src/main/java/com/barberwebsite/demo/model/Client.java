package com.barberwebsite.demo.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;


import jakarta.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("client")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Client extends Userr {
    
    public Client(String username, String password, UserRole role, String name, String phoneNumber) {
        super(username, password, role, name, phoneNumber);
        this.dateOfRegistration = new Date();
    }
    @Column(nullable=false)
    private Date dateOfRegistration;
    @OneToMany(mappedBy="client")
    @JsonManagedReference(value="clientValue")
    private List<Appointment> appointments;
    
    
    
    


}
