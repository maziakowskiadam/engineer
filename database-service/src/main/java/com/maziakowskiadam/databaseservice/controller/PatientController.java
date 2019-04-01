package com.maziakowskiadam.databaseservice.controller;


import com.maziakowskiadam.databaseservice.entity.Patient;
import com.maziakowskiadam.databaseservice.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    PatientService patientService;

    @GetMapping("/{id}")
    @ResponseBody
    public Patient getPatient(@PathVariable Long id) {

        return patientService.getPatient(id);
    }

    @GetMapping("/all")
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/delete/{id}")
    @Transactional
    public String deleteMedication(@PathVariable Long id) {

        return patientService.deletePatient(id);
    }


    @PostMapping("/register")
    @ResponseBody
    public String registerPatient(@RequestBody Patient patient) {

        return patientService.registerPatient(patient);
    }


    @PostMapping("/edit")
    public String editPatient(@RequestBody Patient patient) {

        return patientService.editPatient(patient);

    }




}
