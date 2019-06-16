package com.maziakowskiadam.databaseservice.service;


import com.maziakowskiadam.databaseservice.dto.AddAppointmentDto;
import com.maziakowskiadam.databaseservice.dto.AppointmentDto;
import com.maziakowskiadam.databaseservice.tools.Mapping;
import com.maziakowskiadam.databaseservice.entity.*;
import com.maziakowskiadam.databaseservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class AppointmentService {

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    RoomRepository roomRepository;

    public boolean addAppointments(AddAppointmentDto[] addAppointmentDtos) {
        try {
            Stream<AddAppointmentDto> stream = Arrays.stream(addAppointmentDtos);
            Stream<Doctor> doctorStream = doctorRepository.findAll().stream();

            List<Appointment> appointments = stream.map(addAppointmentDto -> {
                Doctor doctor = doctorStream.filter(d -> d.getId() == addAppointmentDto.getDoctorId())
                        .findFirst()
                        .get();

                Appointment appointment = new Appointment();
                appointment.setDate(addAppointmentDto.getDate());
                appointment.setTime(addAppointmentDto.getTime());
                appointment.setDoctor(doctor);

                return appointment;
            }).collect(Collectors.toList());

            appointmentRepository.saveAll(appointments);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }


    public AppointmentDto getSingleAppointment(Long id) {

        Appointment appointment = appointmentRepository.findById(id).get();

        return Mapping.appointmentAsDto(appointment);
    }

    public List<AppointmentDto> getAllAppointments() {

        List<Appointment> appointments = appointmentRepository.findAll();
        List<AppointmentDto> dtos = new ArrayList<>();

        for (Appointment a : appointments) {
            dtos.add(Mapping.appointmentAsDto(a));
        }

        return dtos;
    }


    public String deleteAppointment(Long id) {
        try {

            Optional<Appointment> optionalAppointment = appointmentRepository.findById(id);

            if (optionalAppointment.isPresent()) {
                appointmentRepository.delete(optionalAppointment.get());
            } else {
                throw new Exception("Appointment doesn't exist!");
            }

            return "Appointment deleted.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Appointment not deleted.";
        }
    }
}
