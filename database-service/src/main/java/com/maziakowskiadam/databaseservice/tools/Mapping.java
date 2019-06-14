package com.maziakowskiadam.databaseservice.tools;

import com.maziakowskiadam.databaseservice.dto.*;
import com.maziakowskiadam.databaseservice.entity.*;

public class Mapping {

    public static AddressDto addressAsDto(Address address) {

        AddressDto addressDto = new AddressDto();

        addressDto.setId(address.getId());
        addressDto.setStreet(address.getStreet());
        addressDto.setHouse(address.getHouse());
        addressDto.setZipcode(address.getZipcode());
        addressDto.setCity(address.getCity());

        return addressDto;
    }

    public static DoctorDto doctorAsDto(Doctor doctor) {

        DoctorDto doctorDto = new DoctorDto();

        doctorDto.setId(doctor.getId());
        doctorDto.setFirstName(doctor.getFirstName());
        doctorDto.setLastName(doctor.getLastName());
        doctorDto.setSpecialization(doctor.getSpec().getName());

        return doctorDto;
    }

    public static PatientDto patientAsDto(Patient patient) {

        PatientDto patientDto = new PatientDto();

        patientDto.setId(patient.getId());
        patientDto.setFirstName(patient.getFirstName());
        patientDto.setLastName(patient.getLastName());
        patientDto.setPesel(patient.getPesel());
        patientDto.setGender(patient.getGender());
        patientDto.setAddressId(patient.getAddress().getId());
        patientDto.setIdentityId(patient.getIdentityId());

        return patientDto;
    }

    public static SpecializationDto specAsDto(Specialization specialization) {

        SpecializationDto specializationDto = new SpecializationDto();

        specializationDto.setId(specialization.getId());
        specializationDto.setName(specialization.getName());
        specializationDto.setDescription(specialization.getDescription());

        return specializationDto;
    }

    public static AppointmentDto appointmentAsDto(Appointment appointment) {

        AppointmentDto dto = new AppointmentDto();

        dto.setId(appointment.getId());
        dto.setDate(appointment.getDate());
        dto.setTime(appointment.getTime());
        dto.setPatientId(appointment.getPatient().getId());
        dto.setDoctorId(appointment.getDoctor().getId());

        return dto;
    }

    public static ExaminationTypeDto examinationTypeAsDto(ExaminationType examinationType) {
        ExaminationTypeDto dto = new ExaminationTypeDto();

        dto.setId(examinationType.getId());
        dto.setName(examinationType.getName());
        dto.setDescription(examinationType.getDescription());
        dto.setDuration(examinationType.getDuration());

        return dto;
    }

    public static RoomDto roomAsDto(Room room) {
        RoomDto dto = new RoomDto();

        dto.setId(room.getId());
        dto.setNumber(room.getNumber());
        dto.setBuilding(room.getBuilding());
        dto.setFloor(room.getFloor());
        dto.setDescription(room.getDescription());

        return dto;
    }

    public static ResultDto resultAsDto(Result result) {
        ResultDto dto = new ResultDto();

        dto.setId(result.getId());
        dto.setObservations(result.getObservations());
        dto.setProcedures(result.getProcedures());
        dto.setConclusions(result.getConclusions());
        dto.setRecommendations(result.getRecommendations());
        dto.setAppointmentId(result.getAppointment().getId());

        return dto;
    }


}
