package com.barberwebsite.demo.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import jakarta.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("barber")
@Getter
@Setter
public class Barber extends Userr {

    public Barber() {
    }

    public Barber(String username, String password, UserRole role, String name, String phoneNumber) {
        super(username, password, role, name, phoneNumber);
        this.dateOfRegistration = new Date();
    }

    @Column(nullable = false)
    private Date dateOfRegistration;
    @OneToMany(mappedBy = "barber")
    @JsonManagedReference(value = "barberValue")
    private List<Appointment> appointments;

}
