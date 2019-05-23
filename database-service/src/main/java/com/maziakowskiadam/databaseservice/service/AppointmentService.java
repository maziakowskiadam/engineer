package com.maziakowskiadam.databaseservice.service;


import com.maziakowskiadam.databaseservice.dto.AppointmentDto;
import com.maziakowskiadam.databaseservice.dto.Mapping;
import com.maziakowskiadam.databaseservice.entity.Appointment;
import com.maziakowskiadam.databaseservice.entity.Doctor;
import com.maziakowskiadam.databaseservice.entity.Patient;
import com.maziakowskiadam.databaseservice.repository.AppointmentRepository;
import com.maziakowskiadam.databaseservice.repository.DoctorRepository;
import com.maziakowskiadam.databaseservice.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    public String addAppointment(AppointmentDto dto) {

        try {
            Appointment newAppointment = new Appointment();

            Optional<Patient> optionalPatient = patientRepository.findById(dto.getPatientId());
            if (optionalPatient.isPresent()) {
                newAppointment.setPatient(optionalPatient.get());
            } else {
                throw new Exception("Patient doesn't exist!");
            }

            Optional<Doctor> optionalDoctor = doctorRepository.findById(dto.getDoctorId());
            if (optionalDoctor.isPresent()) {
                newAppointment.setDoctor(optionalDoctor.get());
            } else {
                throw new Exception("Doctor doesn't exist!");
            }

            newAppointment.setDate(dto.getDate());
            newAppointment.setTime(dto.getTime());
            newAppointment.setDescription(dto.getDescription());

            appointmentRepository.save(newAppointment);

            return "Appointment saved";
        } catch (Exception e) {
            e.printStackTrace();
            return "Appointment not added. Check the console";
        }
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
