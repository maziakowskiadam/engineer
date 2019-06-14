package com.maziakowskiadam.databaseservice.service;


import com.maziakowskiadam.databaseservice.dto.AppointmentDto;
import com.maziakowskiadam.databaseservice.tools.Mapping;
import com.maziakowskiadam.databaseservice.entity.*;
import com.maziakowskiadam.databaseservice.repository.*;
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

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    ExaminationTypeRepository examinationTypeRepository;


    public String addAppointment(AppointmentDto dto) {

        try {
            Appointment newAppointment = new Appointment();
            Optional<Doctor> optionalDoctor = doctorRepository.findById(dto.getDoctorId());

            Optional<Appointment> optionalApp = appointmentRepository.findAppointmentByDateAndTimeAndDoctor(dto.getDate(), dto.getTime(), optionalDoctor.get());
            if (optionalApp.isPresent()) {
                throw new Exception("This appointment already taken");
            } else {
                if (optionalDoctor.isPresent()) {
                    newAppointment.setDoctor(optionalDoctor.get());
                } else {
                    throw new Exception("Doctor doesn't exist!");
                }

            }

            Optional<Patient> optionalPatient = patientRepository.findById(dto.getPatientId());
            if (optionalPatient.isPresent()) {
                newAppointment.setPatient(optionalPatient.get());
            } else {
                throw new Exception("Patient doesn't exist!");
            }


            Optional<Room> optionalRoom = roomRepository.findById(dto.getRoomId());
            if (optionalRoom.isPresent()) {
                newAppointment.setRoom(optionalRoom.get());
            } else {
                throw new Exception("Room doesn't exist!");
            }

            Optional<ExaminationType> optionalType = examinationTypeRepository.findById(dto.getExaminationTypeId());
            if (optionalRoom.isPresent()) {
                newAppointment.setExaminationType(optionalType.get());
            } else {
                throw new Exception("Examination type doesn't exist!");
            }

            newAppointment.setDate(dto.getDate());
            newAppointment.setTime(dto.getTime());

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
