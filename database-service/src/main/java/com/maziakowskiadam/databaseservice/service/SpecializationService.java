package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.entity.Specialization;
import com.maziakowskiadam.databaseservice.repository.SpecializationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class SpecializationService {

    @Autowired
    SpecializationRepository specializationRepository;

    public String addSpecialization(@RequestBody Specialization specialization) {
        try {
            specializationRepository.save(specialization);
            return "Specialization added.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Specialization couldn't be added.";
        }
    }

    public Specialization getSpecialization(Long id) {
        return specializationRepository.findById(id).get();
    }

    public List<Specialization> getAllSpecializations() {
        return specializationRepository.findAll();
    }
}
