package com.maziakowskiadam.databaseservice.controller;

import com.kastkode.springsandwich.filter.annotation.Before;
import com.kastkode.springsandwich.filter.annotation.BeforeElement;
import com.maziakowskiadam.databaseservice.dto.PatientDto;
import com.maziakowskiadam.databaseservice.dto.AddPatientDto;
import com.maziakowskiadam.databaseservice.security.JwtConfig;
import com.maziakowskiadam.databaseservice.security.JwtTokenFilter;
import com.maziakowskiadam.databaseservice.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
@CrossOrigin()
public class PatientController {

    @Autowired
    PatientService patientService;

    @PostMapping("/authorize")
    public ResponseEntity authorizePatient(@RequestBody String identityId ) {
        return patientService.authorizePatient(identityId)
                ? new ResponseEntity(HttpStatus.OK)
                : new ResponseEntity(HttpStatus.BAD_REQUEST);
    }


//    @Before(@BeforeElement(value = JwtTokenFilter.class, flags = {JwtConfig.DOCTOR, JwtConfig.MANAGEMENT}))
    @GetMapping("/all")
    public List<PatientDto> getPatients() {

        return patientService.getPatients();
    }

    @Before(@BeforeElement(value = JwtTokenFilter.class))
    @GetMapping("/{id}")
    public PatientDto getSinglePatient(@PathVariable Long id) {
        return patientService.getSinglePatient(id);
    }

//    @Before(@BeforeElement(value = JwtTokenFilter.class, flags = {JwtConfig.DOCTOR, JwtConfig.MANAGEMENT}))
    @PostMapping("/add")
    public ResponseEntity addPatient(@RequestBody AddPatientDto addPatientDto) {
        return patientService.addPatient(addPatientDto)
                ? new ResponseEntity(HttpStatus.OK)
                : new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/addUnauthorized")
    public ResponseEntity addPatientUnauthorized(@RequestBody AddPatientDto addPatientDto) {
        return patientService.addPatientUnauthorized(addPatientDto)
                ? new ResponseEntity(HttpStatus.OK)
                : new ResponseEntity(HttpStatus.BAD_REQUEST);
    }


    @Before(@BeforeElement(value = JwtTokenFilter.class, flags = {JwtConfig.DOCTOR, JwtConfig.MANAGEMENT}))
    @GetMapping("delete/{id}")
    public String deletePatient(@PathVariable Long id) {
        return patientService.deletePatientById(id);
    }

    @Before(@BeforeElement(value = JwtTokenFilter.class, flags = {JwtConfig.DOCTOR, JwtConfig.MANAGEMENT}))
    @PostMapping("/edit/{id}")
    @ResponseBody
    public String editAddress(@PathVariable Long id, @RequestBody AddPatientDto addPatientDto) {
        return patientService.editPatient(id, addPatientDto);
    }


}
