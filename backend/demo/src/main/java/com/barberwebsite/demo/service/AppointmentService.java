package com.barberwebsite.demo.service;




import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
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

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
@Slf4j
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
    log.info("O cliente: " +  username + "Realizou um agendamento para o dia: " + appointmentDTO.date().toString());
    

    // Criar o agendamento e associar o appointmentType
    Appointment appointment = new Appointment();
    appointment.setAppointmentType(appointmentDTO.appointmentType());
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

    public List<String> consultAllAppointments(@RequestBody ConsultAppointmentDTO data) {
        log.info(data.data().toString()+ "Essa foi a data selecionada");
        Barber barber = usuarioRepository.findBarberById(data.idBarber());
        List<Appointment> barberAppointments = obterAgendamentosDoDia(barber.getAppointments(), data.data());
        for(Appointment ap: barberAppointments) {
            log.info(ap.getDate().toString());
        }
        
        List<String> allHours = Arrays.asList(
                "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
                "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
                "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00");
        boolean isCurrentDay = isMesmoDia(data.data(), setarFuso(new Date()));
        List<String> availableHours = allHours.stream()
        .filter(hour -> {
            if (isCurrentDay) { // Verifica se o dia escolhido é o dia atual
                LocalTime currentTimeMinusThreeHours = LocalTime.now();
                LocalTime currentHour = LocalTime.parse(hour);
                
                return currentHour.isAfter(currentTimeMinusThreeHours);
                
            } else {
                
                return true; // Retorna true para todos os horários se o dia escolhido não for o dia atual
            }
        })
        .collect(Collectors.toList());
        
        List<String> appointmentStates = availableHours.stream().map(hour -> {
            if (barberAppointments.stream().anyMatch(appointment -> isMesmaHora(appointment.getDate(), hour))) {
                if (barberAppointments.stream().anyMatch(appointment -> isMesmaHoraBlock(appointment, hour))) {
                    return "bloqueado";
                }
                else {
                    return "ocupado";
                }

            }
            else {
                return "livre";
            }
        }).collect(Collectors.toList());
        return appointmentStates;

    }
    private boolean isMesmaHoraBlock(Appointment appointment, String data2) {
        java.util.Calendar calendar1 = java.util.Calendar.getInstance();
        calendar1.setTime(appointment.getDate());

        int hora1 = calendar1.get(java.util.Calendar.HOUR_OF_DAY);
        int minuto1 = calendar1.get(java.util.Calendar.MINUTE);

        data2 = data2.replace(":", "");
        int hora2 = Integer.parseInt(data2.substring(0, 2));
        int minuto2 = Integer.parseInt(data2.substring(2));

        return hora1 == hora2 && minuto1 == minuto2 && appointment.getClient().getId()==52;
    }


    public List<String> consultAppointments(@RequestBody ConsultAppointmentDTO data) {
        List<String> disponibleHours = new ArrayList<>();
        Barber barber = usuarioRepository.findBarberById(data.idBarber());
        List<Appointment> barberAppointments = obterAgendamentosDoDia(barber.getAppointments(), data.data());
        List<String> allHours = Arrays.asList(
                "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
                "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
                "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00");
                

                boolean isCurrentDay = isMesmoDia(data.data(), setarFuso(new Date()));
                log.info("As datas: " + data.data().toString() + setarFuso(new Date()) + "entram na funcao: " +  isCurrentDay);
        

        List<String> availableHours = allHours.stream()
        .filter(hour -> {
            if (isCurrentDay) { // Verifica se o dia escolhido é o dia atual
                LocalTime currentTimeMinusThreeHours = LocalTime.now();
                LocalTime currentHour = LocalTime.parse(hour);
                
                return currentHour.isAfter(currentTimeMinusThreeHours);
                
            } else {
                
                return true; // Retorna true para todos os horários se o dia escolhido não for o dia atual
            }
        })
        .collect(Collectors.toList());

        disponibleHours = availableHours.stream().filter(
                hora -> barberAppointments.stream().noneMatch(appointment -> isMesmaHora(appointment.getDate(), hora)))
                .collect(Collectors.toList());

        return disponibleHours;

    }
    public String deleteAppointmentByDate (HttpServletRequest request, @PathVariable Date date) {
         var barberToken= request.getHeader("Authorization");
         if(barberToken != null && barberToken.startsWith("Bearer ")) {
            String token= barberToken.substring(7);
            log.info(token);
            var username= tokenService.validateToken(token);
            Barber barber = usuarioRepository.findBarberById(1);
            List<Appointment> barberAppointments = barber.getAppointments();
            for (Appointment ap: barberAppointments) {
                if(isMesmoDia(ap.getDate(), date) && isMesmaHora2(date, ap.getDate())) {
                    deleteAppointment(ap.getId());
                    return "Horário desmarcado com sucesso";
                }
            }
         }
         return "Horario não desmarcado";
    }
    
    public List<AppointmentResponseDTO> clientAppointments (@PathVariable String token) {
        var username= tokenService.validateToken(token);
        Client client = usuarioRepository.findClientByUsername(username);
        Barber barber= usuarioRepository.findBarberByUsername(username);
        if (client==null) {
            List<Appointment> barberAppointments= barber.getAppointments();
            if (barberAppointments.isEmpty()) {
                return null;
            }
        List<AppointmentResponseDTO> clientAppointmentsDTO= new ArrayList<>();
        for (Appointment ap: barberAppointments) {
            AppointmentResponseDTO apDTO= new AppointmentResponseDTO (ap.getId(), ap.getBarber().getName(), ap.getDate(), ap.getAppointmentType());
             clientAppointmentsDTO.add(apDTO);
        }
        return clientAppointmentsDTO;
     }

        
        
        List<Appointment> clientAppointments= client.getAppointments();
        if (clientAppointments.isEmpty()) {
            return null;
        }
        List<AppointmentResponseDTO> clientAppointmentsDTO= new ArrayList<>();
        for (Appointment ap: clientAppointments) {
            AppointmentResponseDTO apDTO= new AppointmentResponseDTO (ap.getId(), ap.getBarber().getName(), ap.getDate(), ap.getAppointmentType());
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
    private Date setarFuso(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
         // Subtrai 3 horas do horário atual
        return calendar.getTime(); // Retorna a nova data com o fuso horário aplicado
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
    public boolean isMesmaHora2(Date data1, Date data2) {
        java.util.Calendar calendar1 = java.util.Calendar.getInstance();
        calendar1.setTime(data1);

        int hora1 = calendar1.get(java.util.Calendar.HOUR_OF_DAY);
        int minuto1 = calendar1.get(java.util.Calendar.MINUTE);

        java.util.Calendar calendar2 = java.util.Calendar.getInstance();
        calendar2.setTime(data2);

        int hora2 = calendar1.get(java.util.Calendar.HOUR_OF_DAY);
        int minuto2 = calendar1.get(java.util.Calendar.MINUTE);

        return hora1 == hora2 && minuto1 == minuto2;
    }

    


}

