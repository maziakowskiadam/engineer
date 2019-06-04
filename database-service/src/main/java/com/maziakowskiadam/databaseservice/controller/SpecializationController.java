package com.maziakowskiadam.databaseservice.controller;


import com.maziakowskiadam.databaseservice.dto.SpecializationDto;
import com.maziakowskiadam.databaseservice.entity.Specialization;
import com.maziakowskiadam.databaseservice.service.SpecializationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/specializations")
@CrossOrigin
public class SpecializationController {

    @Autowired
    SpecializationService specializationService;

    @PostMapping("/add")
    public String addSpecialization(@RequestBody Specialization specialization) {
        return specializationService.addSpecialization(specialization);
    }

    @GetMapping("/{id}")
    public SpecializationDto getSpecialization(@PathVariable Long id) {
        return specializationService.getSpecialization(id);
    }

    @GetMapping("/all")
    public List<SpecializationDto> getAllSpecializations() {
        return specializationService.getAllSpecializations();
    }

    @PostMapping("/edit/{id}")
    public String editSpecialization(@PathVariable Long id, @RequestBody Specialization specialization) {
        return specializationService.editSpecialization(id, specialization);
    }
}
