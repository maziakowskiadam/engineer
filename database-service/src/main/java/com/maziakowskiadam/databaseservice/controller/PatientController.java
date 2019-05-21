package com.maziakowskiadam.databaseservice.controller;

import com.maziakowskiadam.databaseservice.dto.PatientDto;
import com.maziakowskiadam.databaseservice.entity.Patient;
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

    @PostMapping("/register")
    public String registerPatient(@RequestBody Patient patient) {
        return patientService.addPatient(patient);
    }

    @GetMapping("/{patientId}/addAddress/{addressId}")
    public String addAddressToPatient(@PathVariable Long patientId, @PathVariable Long addressId) {

        return patientService.addAddressToPatient(patientId, addressId);
    }

}
