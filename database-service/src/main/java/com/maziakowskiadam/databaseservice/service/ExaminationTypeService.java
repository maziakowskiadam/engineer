package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.dto.ExaminationTypeDto;
import com.maziakowskiadam.databaseservice.tools.Mapping;
import com.maziakowskiadam.databaseservice.entity.ExaminationType;
import com.maziakowskiadam.databaseservice.repository.ExaminationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ExaminationTypeService {

    @Autowired
    ExaminationTypeRepository examinationTypeRepository;

    public ExaminationTypeDto getSingleExaminationType(Long id) {
        try {
            Optional<ExaminationType> type = examinationTypeRepository.findById(id);

            if (type.isPresent()) {
                ExaminationType existing = type.get();
                ExaminationTypeDto dto = new ExaminationTypeDto();
                dto.setId(existing.getId());
                dto.setName(existing.getName());
                dto.setDescription(existing.getDescription());
                dto.setDuration(existing.getDuration());
                return dto;
            } else {
                throw new Exception("No such type in database.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String addExaminationType(ExaminationTypeDto dto) {
        try {

            Optional<ExaminationType> optionalType = examinationTypeRepository.findByName(dto.getName());

            if (!optionalType.isPresent()) {
                ExaminationType newType = new ExaminationType();
                newType.setName(dto.getName());
                newType.setDescription(dto.getDescription());
                newType.setDuration(dto.getDuration());
                examinationTypeRepository.save(newType);
            } else {
                throw new Exception("Type of that name is already in database");
            }

            return "Examination type added.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Examination type not added. Check the console.";
        }

    }

    public List<ExaminationTypeDto> getAllExaminationTypes() {
        List<ExaminationType> types = examinationTypeRepository.findAll();
        List<ExaminationTypeDto> dtos = new ArrayList<>();

        for (ExaminationType e : types) {
            dtos.add(Mapping.examinationTypeAsDto(e));
        }

        return dtos;
    }

    public String editExaminationType(ExaminationTypeDto dto, Long id) {

        try {
            Optional<ExaminationType> optionalType = examinationTypeRepository.findById(id);

            if (optionalType.isPresent()) {
                ExaminationType type = optionalType.get();
                type.setName(dto.getName());
                type.setDescription(dto.getDescription());
                type.setDuration(dto.getDuration());
                examinationTypeRepository.save(type);
                return "Type edited";
            } else {
                throw new Exception("No such type in database.");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Type couldn't be deleted.";
        }
    }


}
