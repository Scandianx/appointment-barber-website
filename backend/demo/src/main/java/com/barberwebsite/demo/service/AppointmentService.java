package com.barberwebsite.demo.service;



import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestBody;

import com.barberwebsite.demo.dtos.AppointmentDTO;
import com.barberwebsite.demo.dtos.AppointmentResponseDTO;
import com.barberwebsite.demo.dtos.ConsultAppointmentDTO;
import com.barberwebsite.demo.model.Appointment;
import com.barberwebsite.demo.model.Barber;
import com.barberwebsite.demo.model.Client;
import com.barberwebsite.demo.repository.AppointmentRepository;
import com.barberwebsite.demo.repository.UsuarioRepository1;
import com.barberwebsite.demo.security.TokenService;

@Service
public class AppointmentService {

   @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private UsuarioRepository1 usuarioRepository;
   
    @Autowired
    TokenService tokenService;

    
    public Appointment newAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        Barber barber = usuarioRepository.findBarberById(appointmentDTO.barber());
    var username = tokenService.validateToken(appointmentDTO.client());
    Client client = usuarioRepository.findClientByUsername(username);
    

    // Criar o agendamento e associar o appointmentType
    Appointment appointment = new Appointment();
    appointment.setAppointmentKind(appointment.getAppointmentKind());
    appointment.setDate(appointmentDTO.date());
    appointment.setComments(appointmentDTO.comments());
    appointment.setBarber(barber);
    appointment.setClient(client);
    

    // Adicionar o agendamento à lista de agendamentos do barbeiro e do cliente
    List<Appointment> barberAppointments = barber.getAppointments();
    barberAppointments.add(appointment);
    barber.setAppointments(barberAppointments);

    List<Appointment> clientAppointments = client.getAppointments();
    clientAppointments.add(appointment);
    client.setAppointments(clientAppointments);

    // Salvar primeiro o cliente e o barbeiro
    usuarioRepository.save(barber);
    usuarioRepository.save(client);

    // Agora podemos salvar o agendamento
    appointmentRepository.save(appointment);

    
    

    return appointment;
}
    

    /**
     * Handles the deletion of an appointment based on the provided appointment ID.
     *
     * @param appointmentId The ID of the appointment to be deleted.
     * @return ResponseEntity with a message indicating the result of the deletion.
     */
    
    public ResponseEntity<String> deleteAppointment(@PathVariable Integer appointmentId) {
        // Check if the appointment exists
        if (!appointmentRepository.existsById(appointmentId)) {
            return ResponseEntity.notFound().build();
        }

        // Get the appointment to be deleted
        Appointment appointment = appointmentRepository.findById(appointmentId).get();

        // Get the barber associated with the appointment
        Barber barber = appointment.getBarber();

        // Get the client associated with the appointment
        Client client = appointment.getClient();

        barber.getAppointments().remove(appointment);
        client.getAppointments().remove(appointment);

        usuarioRepository.save(barber);
        usuarioRepository.save(client);

        appointmentRepository.deleteById(appointmentId);

        return ResponseEntity.ok("Appointment deleted successfully.");
    }

    
    public List<String> consultAppointments(@RequestBody ConsultAppointmentDTO data) {
        List<String> disponibleHours = new ArrayList<>();
        Barber barber = usuarioRepository.findBarberById(data.idBarber());
        List<Appointment> barberAppointments = obterAgendamentosDoDia(barber.getAppointments(), data.data());
        List<String> allHours = Arrays.asList(
                "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
                "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
                "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00");
        disponibleHours = allHours.stream().filter(
                hora -> barberAppointments.stream().noneMatch(appointment -> isMesmaHora(appointment.getDate(), hora)))
                .collect(Collectors.toList());

        return disponibleHours;

    }
    
    public List<AppointmentResponseDTO> clientAppointments (@PathVariable String token) {
        var username= tokenService.validateToken(token);
        Client client = usuarioRepository.findClientByUsername(username);
        List<Appointment> clientAppointments= client.getAppointments();
        if (clientAppointments.isEmpty()) {
            return null;
        }
        List<AppointmentResponseDTO> clientAppointmentsDTO= new ArrayList<>();
        for (Appointment ap: clientAppointments) {
            AppointmentResponseDTO apDTO= new AppointmentResponseDTO (ap.getId(), ap.getBarber().getName(), ap.getDate(), ap.getAppointmentKind());
             clientAppointmentsDTO.add(apDTO);
        }
        return clientAppointmentsDTO;
    }

    public List<Appointment> obterAgendamentosDoDia(List<Appointment> todosAgendamentos, Date dataDesejada) {
        return todosAgendamentos.stream()
                .filter(appointment -> isMesmoDia(appointment.getDate(), dataDesejada))
                .collect(Collectors.toList());
    }

    private boolean isMesmoDia(Date data1, Date data2) {
        // Zerar hora, minuto, segundo e milissegundo para facilitar a comparação
        data1 = zerarHoraMinutoSegundo(data1);
        data2 = zerarHoraMinutoSegundo(data2);

        return data1.equals(data2);
    }

    private Date zerarHoraMinutoSegundo(Date data) {
        java.util.Calendar calendar = java.util.Calendar.getInstance();
        calendar.setTime(data);
        calendar.set(java.util.Calendar.HOUR_OF_DAY, 0);
        calendar.set(java.util.Calendar.MINUTE, 0);
        calendar.set(java.util.Calendar.SECOND, 0);
        calendar.set(java.util.Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    public boolean isMesmaHora(Date data1, String data2) {
        java.util.Calendar calendar1 = java.util.Calendar.getInstance();
        calendar1.setTime(data1);

        int hora1 = calendar1.get(java.util.Calendar.HOUR_OF_DAY);
        int minuto1 = calendar1.get(java.util.Calendar.MINUTE);

        data2 = data2.replace(":", "");
        int hora2 = Integer.parseInt(data2.substring(0, 2));
        int minuto2 = Integer.parseInt(data2.substring(2));

        return hora1 == hora2 && minuto1 == minuto2;
    }
}

