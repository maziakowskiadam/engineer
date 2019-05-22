package com.maziakowskiadam.databaseservice.controller;

import com.maziakowskiadam.databaseservice.dto.PatientDto;
import com.maziakowskiadam.databaseservice.dto.RegisterPatientDto;
import com.maziakowskiadam.databaseservice.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    PatientService patientService;

    @GetMapping("/all")
    public List<PatientDto> getPatients() {
        return patientService.getPatients();
    }

    @GetMapping("/{id}")
    public PatientDto getSinglePatient(@PathVariable Long id) {
        return patientService.getSinglePatient(id);
    }

    @PostMapping("/add")
    public String addPatient(@RequestBody RegisterPatientDto registerPatientDto) {
        return patientService.addPatient(registerPatientDto);
    }

    @GetMapping("delete/{id}")
    public String deletePatient(@PathVariable Long id) {
        return patientService.deletePatientById(id);
    }

    @PostMapping("/edit/{id}")
    @ResponseBody
    public String editAddress(@PathVariable Long id, @RequestBody RegisterPatientDto registerPatientDto) {
        return patientService.editPatient(id, registerPatientDto);
    }


}
