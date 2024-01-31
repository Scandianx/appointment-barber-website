package com.barberwebsite.demo.dtos;

import java.sql.Date;


import com.barberwebsite.demo.model.AppointmentType;

public record ConsultAppointmentDTO(Date data, Integer idBarber, AppointmentType type) {
    
}
