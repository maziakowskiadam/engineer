package com.maziakowskiadam.databaseservice.controller;

import com.maziakowskiadam.databaseservice.dto.AddDoctorDto;
import com.maziakowskiadam.databaseservice.dto.DoctorDto;
import com.maziakowskiadam.databaseservice.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
@CrossOrigin
public class DoctorController {

    @Autowired
    DoctorService doctorService;


    @PostMapping("/add")
    public String addDoctor(@RequestBody AddDoctorDto doctorDto) {
        return doctorService.addDoctor(doctorDto);
    }

    @GetMapping("/{id}")
    public DoctorDto getDoctor(@PathVariable Long id) {
        return doctorService.getDoctor(id);
    }

    @GetMapping("/all")
    public List<DoctorDto> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/delete/{id}")
    public String deleteDoctor(@PathVariable Long id) {
        return doctorService.deleteDoctor(id);
    }

    @PostMapping("/edit/{id}")
    public String editDoctor(@PathVariable Long id, @RequestBody AddDoctorDto addDoctorDto) {
        return doctorService.editDoctor(id, addDoctorDto);
    }

    @GetMapping("/specialization/{id}")
    public List<DoctorDto> getDoctorsBySpec(@PathVariable Long id) {
        return doctorService.getDoctorsBySpec(id);
    }


}
