package com.maziakowskiadam.databaseservice.controller;

import com.maziakowskiadam.databaseservice.dto.ExaminationTypeDto;
import com.maziakowskiadam.databaseservice.service.ExaminationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/examinationTypes")
@CrossOrigin
public class ExaminationTypeController {

    @Autowired
    ExaminationTypeService examinationTypeService;

    @PostMapping("/add")
    public ResponseEntity addExaminationType(@RequestBody ExaminationTypeDto dto) {
        return examinationTypeService.addExaminationType(dto)
                ? new ResponseEntity(HttpStatus.OK)
                : new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}")
    public ExaminationTypeDto getSingleExaminationType(@PathVariable Long id) {
        return examinationTypeService.getSingleExaminationType(id);
    }

    @GetMapping("/all")
    public List<ExaminationTypeDto> getAllExaminationTypes() {
        return examinationTypeService.getAllExaminationTypes();
    }

    @PostMapping("/edit/{id}")
    public String editExaminationType(@RequestBody ExaminationTypeDto dto, @PathVariable Long id) {
        return examinationTypeService.editExaminationType(dto, id);
    }
}
