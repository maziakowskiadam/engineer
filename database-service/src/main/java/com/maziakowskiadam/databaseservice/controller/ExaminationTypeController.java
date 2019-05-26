package com.maziakowskiadam.databaseservice.controller;

import com.maziakowskiadam.databaseservice.dto.ExaminationTypeDto;
import com.maziakowskiadam.databaseservice.service.ExaminationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/examinationTypes")
public class ExaminationTypeController {

    @Autowired
    ExaminationTypeService examinationTypeService;

    @PostMapping("/add")
    public String addExaminationType(@RequestBody ExaminationTypeDto dto) {
        return examinationTypeService.addExaminationType(dto);
    }

    @GetMapping("/{id}")
    public ExaminationTypeDto getSingleExaminationType(@PathVariable Long id) {
        return examinationTypeService.getSingleExaminationType(id);
    }
}
