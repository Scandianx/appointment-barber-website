package com.barberwebsite.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barberwebsite.demo.dtos.AppointmentDTO;
import com.barberwebsite.demo.dtos.AppointmentResponseDTO;
import com.barberwebsite.demo.dtos.ConsultAppointmentDTO;
import com.barberwebsite.demo.model.Appointment;
import com.barberwebsite.demo.service.AppointmentService;

@RestController
@CrossOrigin("*")
@RequestMapping("agendamento")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping()
    public ResponseEntity<Appointment> newAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        Appointment appointment = appointmentService.newAppointment(appointmentDTO);
        return ResponseEntity.ok(appointment);
    }

    @DeleteMapping("/{appointmentId}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Integer appointmentId) {
        appointmentService.deleteAppointment(appointmentId);
        return ResponseEntity.ok("Appointment deleted successfully.");
    }

    @PostMapping("/consult-appointments")
    public List<String> consultAppointments(@RequestBody ConsultAppointmentDTO data) {
        return appointmentService.consultAppointments(data);
    }

    @GetMapping("/{token}")
    public List<AppointmentResponseDTO> clientAppointments(@PathVariable String token) {
        return appointmentService.clientAppointments(token);
    }
}
