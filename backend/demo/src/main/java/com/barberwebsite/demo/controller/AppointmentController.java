package com.barberwebsite.demo.controller;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barberwebsite.demo.dtos.AppointmentBlockDTO;
import com.barberwebsite.demo.dtos.AppointmentDTO;
import com.barberwebsite.demo.dtos.AppointmentResponseDTO;
import com.barberwebsite.demo.dtos.ConsultAppointmentDTO;
import com.barberwebsite.demo.model.Appointment;
import com.barberwebsite.demo.service.AppointmentService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin("*")
@RequestMapping("agendamento")
@Slf4j
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PutMapping()
    public String deleteAppointmentByDate (HttpServletRequest request, @RequestBody AppointmentBlockDTO data) {
        
            return appointmentService.deleteAppointmentByDate(request, data);
        
    }
    @PostMapping()
    public ResponseEntity<Appointment> newAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        Appointment appointment = appointmentService.newAppointment(appointmentDTO);
        return ResponseEntity.ok(appointment);
    }
    @PostMapping("/blockappointment")
    public String blockAppointment(HttpServletRequest request, @RequestBody AppointmentBlockDTO data) {
        return appointmentService.blockAppointment(request, data);
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
    @PostMapping("/consult-appointments/barber")
    public List<String> consultAllAppointments(@RequestBody ConsultAppointmentDTO data) {
        return appointmentService.consultAllAppointments(data);
    }
    
    
}
