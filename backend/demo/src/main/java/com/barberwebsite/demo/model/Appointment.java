package com.barberwebsite.demo.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;


import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@SequenceGenerator(name = "generator_scheduling", sequenceName = "sequence_scheduling", initialValue = 1, allocationSize = 1)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_scheduling")
    private Integer id;
    @Column(nullable = false)
    private AppointmentType appointmentType;
    @Column(nullable = false)
    private Date date;
    @Column(nullable = true)
    private String comments;
    @ManyToOne
    @JoinColumn(name = "barber_id")
    @JsonBackReference(value = "barberValue")
    private Barber barber;
    public Appointment(AppointmentType appointmentType, Date date, String comments, Barber barber, Client client) {
        this.appointmentType = appointmentType;
        this.date = date;
        this.comments = comments;
        this.barber = barber;
        this.client = client;
        
        

    }
    @ManyToOne
    @JoinColumn(name = "client_id")
    @JsonBackReference(value = "clientValue")
    private Client client;
    
}
