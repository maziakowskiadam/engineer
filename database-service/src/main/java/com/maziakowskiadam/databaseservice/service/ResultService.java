package com.maziakowskiadam.databaseservice.service;


import com.maziakowskiadam.databaseservice.tools.Mapping;
import com.maziakowskiadam.databaseservice.dto.ResultDto;
import com.maziakowskiadam.databaseservice.entity.Appointment;
import com.maziakowskiadam.databaseservice.entity.Result;
import com.maziakowskiadam.databaseservice.repository.AppointmentRepository;
import com.maziakowskiadam.databaseservice.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ResultService {

    @Autowired
    ResultRepository resultRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    public boolean addResult(ResultDto dto) {

        try {
            Optional<Appointment> optionalAppointment = appointmentRepository.findById(dto.getAppointmentId());

            if (optionalAppointment.isPresent()) {
                Result newResult = new Result();
                newResult.setObservations(dto.getObservations());
                newResult.setConclusions(dto.getConclusions());
                newResult.setRecommendations(dto.getRecommendations());
                newResult.setAppointment(optionalAppointment.get());
                resultRepository.save(newResult);

            }
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<ResultDto> getResultsForAppointment(Long id) {

        Optional<Appointment> optionalAppointment = appointmentRepository.findById(id);
        List<ResultDto> dtos = new ArrayList<>();
        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            List<Result> results = appointment.getResults();

            for (Result res : results) {
                dtos.add(Mapping.resultAsDto(res));
            }

        }
        return dtos;

    }


    public List<ResultDto> getAllResults() {
        List<Result> results = resultRepository.findAll();
        List<ResultDto> dtos = new ArrayList<>();

        for (Result r : results) {
            dtos.add(Mapping.resultAsDto(r));
        }
        return dtos;
    }
}
