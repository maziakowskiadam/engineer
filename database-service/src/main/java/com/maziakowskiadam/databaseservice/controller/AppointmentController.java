package com.maziakowskiadam.databaseservice.controller;

import com.maziakowskiadam.databaseservice.dto.AddAppointmentDto;
import com.maziakowskiadam.databaseservice.dto.AppointmentDto;
import com.maziakowskiadam.databaseservice.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
@CrossOrigin
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @PostMapping("/add")
    public String addAppointment(@RequestBody AppointmentDto dto) {
        return "FAILED";
    }

    @PostMapping("/addMany")
    public ResponseEntity<Void> addMany(@RequestBody AddAppointmentDto[] addAppointmentDto) {
        return appointmentService.addAppointments(addAppointmentDto)
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/setPatient/{appointmentId}")
    public ResponseEntity<Void> setPatient(@PathVariable Long appointmentId, @RequestBody Long patientId) {
        return this.appointmentService.setPatient(appointmentId, patientId)
            ? new ResponseEntity<>(HttpStatus.OK)
            : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}")
    public AppointmentDto getSingleAppointment(@PathVariable Long id) {
        return appointmentService.getSingleAppointment(id);
    }

    @GetMapping("/all")
    public List<AppointmentDto> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/delete/{id}")
    public String deleteAppointment(@PathVariable Long id) {
        return appointmentService.deleteAppointment(id);
    }

    @GetMapping("/doctor/{doctorIdentityId}")
    public List<AppointmentDto> getAppointmentsForDoctor(@PathVariable String doctorIdentityId) {
        return appointmentService.getAppointmentsForDoctor(doctorIdentityId);
    }
}
