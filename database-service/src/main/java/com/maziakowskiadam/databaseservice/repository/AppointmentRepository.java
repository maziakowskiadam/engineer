package com.maziakowskiadam.databaseservice.repository;

import com.maziakowskiadam.databaseservice.entity.Appointment;
import com.maziakowskiadam.databaseservice.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Optional<Appointment> findAppointmentByDateAndTime(String date, String time);

    Optional<Appointment> findAppointmentByDateAndTimeAndDoctor(String date, String time, Doctor doctor);

    List<Appointment> findAllByDoctor(Doctor doctor);
}
