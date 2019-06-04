package com.maziakowskiadam.databaseservice.controller;

import com.maziakowskiadam.databaseservice.dto.AppointmentDto;
import com.maziakowskiadam.databaseservice.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
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
        return appointmentService.addAppointment(dto);
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
}
