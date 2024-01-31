package com.barberwebsite.demo.dtos;

import java.util.Date;



import com.barberwebsite.demo.model.AppointmentType;





public record AppointmentDTO (AppointmentType appointmentType, Integer barber, String client, Date date, String comments) {

}
