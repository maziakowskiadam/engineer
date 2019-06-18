package com.maziakowskiadam.databaseservice.service;


import com.maziakowskiadam.databaseservice.dto.AddAppointmentDto;
import com.maziakowskiadam.databaseservice.dto.AppointmentDto;
import com.maziakowskiadam.databaseservice.tools.Mapping;
import com.maziakowskiadam.databaseservice.entity.*;
import com.maziakowskiadam.databaseservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
            List<Appointment> appointments = new ArrayList<>();
            for (AddAppointmentDto addAppointmentDto : addAppointmentDtos) {
                Optional<Doctor> doctor = doctorRepository.findById(addAppointmentDto.getDoctorId());
                if (!doctor.isPresent()) {
                    throw new Exception("No doctor");
                }

                Appointment appointment = new Appointment();
                appointment.setDate(addAppointmentDto.getDate());
                appointment.setTime(addAppointmentDto.getTimeStart());
                appointment.setDoctor(doctor.get());

                appointments.add(appointment);
            }

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

    public List<AppointmentDto> getAppointmentsForDoctor(String doctorIdentityId) {

        Doctor doctor = doctorRepository.findByIdentityId(doctorIdentityId);

        List<Appointment> appointments = appointmentRepository.findAllByDoctor(doctor);
        List<AppointmentDto> dtos = new ArrayList<>();

        for (Appointment a : appointments) {
            dtos.add(Mapping.appointmentAsDto(a));
        }

        return dtos;
    }

    public boolean setPatient(Long appointmentId, Long patientId) {
        Optional<Patient> patient = this.patientRepository.findPatientById(patientId);
        if (!patient.isPresent()) {
            return false;
        }

        Optional<Appointment> optionalAppointment = this.appointmentRepository.findAppointmentById(appointmentId);
        if (!optionalAppointment.isPresent() || optionalAppointment.get().getPatient() != null) {
            return false;
        }

        Appointment appointment = optionalAppointment.get();
        appointment.setPatient(patient.get());
        appointmentRepository.save(appointment);

        return true;
    }

    @Transactional
    public boolean finishAppointment(Long appointmentId) {

        try {
            Optional<Appointment> optionalAppointment = appointmentRepository.findAppointmentById(appointmentId);

            if (optionalAppointment.isPresent()) {
                optionalAppointment.get().setDone(true);
                return true;
            } else {
                return false;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }
}
