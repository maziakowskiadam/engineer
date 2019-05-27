package com.maziakowskiadam.databaseservice.controller;

import com.kastkode.springsandwich.filter.annotation.Before;
import com.kastkode.springsandwich.filter.annotation.BeforeElement;
import com.maziakowskiadam.databaseservice.dto.PatientDto;
import com.maziakowskiadam.databaseservice.dto.RegisterPatientDto;
import com.maziakowskiadam.databaseservice.security.JwtConfig;
import com.maziakowskiadam.databaseservice.security.JwtTokenFilter;
import com.maziakowskiadam.databaseservice.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    PatientService patientService;

    @Before(@BeforeElement(value = JwtTokenFilter.class, flags = {JwtConfig.DOCTOR, JwtConfig.MANAGEMENT}))
    @GetMapping("/all")
    public List<PatientDto> getPatients() {
        return patientService.getPatients();
    }

    @Before(@BeforeElement(value = JwtTokenFilter.class))
    @GetMapping("/{id}")
    public PatientDto getSinglePatient(@PathVariable Long id) {
        return patientService.getSinglePatient(id);
    }

    @Before(@BeforeElement(value = JwtTokenFilter.class, flags = {JwtConfig.DOCTOR, JwtConfig.MANAGEMENT}))
    @PostMapping("/add")
    public String addPatient(@RequestBody RegisterPatientDto registerPatientDto) {
        return patientService.addPatient(registerPatientDto);
    }

    @Before(@BeforeElement(value = JwtTokenFilter.class, flags = {JwtConfig.DOCTOR, JwtConfig.MANAGEMENT}))
    @GetMapping("delete/{id}")
    public String deletePatient(@PathVariable Long id) {
        return patientService.deletePatientById(id);
    }

    @Before(@BeforeElement(value = JwtTokenFilter.class, flags = {JwtConfig.DOCTOR, JwtConfig.MANAGEMENT}))
    @PostMapping("/edit/{id}")
    @ResponseBody
    public String editAddress(@PathVariable Long id, @RequestBody RegisterPatientDto registerPatientDto) {
        return patientService.editPatient(id, registerPatientDto);
    }


}
