package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.dto.SpecializationDto;
import com.maziakowskiadam.databaseservice.entity.Specialization;
import com.maziakowskiadam.databaseservice.repository.SpecializationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SpecializationService {

    @Autowired
    SpecializationRepository specializationRepository;

    public String addSpecialization(@RequestBody Specialization specialization) {
        try {

            Optional<Specialization> optSpec = specializationRepository.findSpecializationByName(specialization.getName());

            if (!optSpec.isPresent()) {
                specializationRepository.save(specialization);
                return "Specialization added.";
            } else {
                return "Specialization already in database.";
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Specialization couldn't be added.";
        }
    }

    public SpecializationDto getSpecialization(Long id) {
        Specialization specialization = specializationRepository.findById(id).get();
        return turnSpecializationIntoDto(specialization);
    }

    private SpecializationDto turnSpecializationIntoDto(Specialization specialization) {
        SpecializationDto specializationDto = new SpecializationDto();
        specializationDto.setId(specialization.getId());
        specializationDto.setName(specialization.getName());
        specializationDto.setDescription(specialization.getDescription());

        return specializationDto;
    }

    public List<SpecializationDto> getAllSpecializations() {

        List<Specialization> specs = specializationRepository.findAll();
        List<SpecializationDto> dtos = new ArrayList<>();

        for (Specialization s : specs) {
            dtos.add(turnSpecializationIntoDto(s));
        }

        return dtos;
    }

    @Transactional
    public String addDescription(Specialization specialization) {
        try {
            Specialization spec = specializationRepository.findSpecializationByName(specialization.getName()).get();
            spec.setDescription(specialization.getDescription());

            return "Description added.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Description not added.";
        }
    }
}
