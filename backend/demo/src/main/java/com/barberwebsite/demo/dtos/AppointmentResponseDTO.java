package com.barberwebsite.demo.dtos;

import java.util.Date;

import com.barberwebsite.demo.model.AppointmentType;


import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class AppointmentResponseDTO {
    private Integer id;
    private String barberName;
    private Date date;
    private AppointmentType appointmentKind;
    public AppointmentResponseDTO (Integer id, String barberName, Date date, AppointmentType appointmentType) {
        this.id=id;
        this.barberName=barberName;
        this.date=date;
        this.appointmentKind=appointmentType;
    }

}
