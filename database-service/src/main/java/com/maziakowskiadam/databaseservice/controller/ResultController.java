package com.maziakowskiadam.databaseservice.controller;


import com.maziakowskiadam.databaseservice.dto.ResultDto;
import com.maziakowskiadam.databaseservice.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/results")
@CrossOrigin
public class ResultController {

    @Autowired
    ResultService resultService;

    @PostMapping("/add")
    public ResponseEntity addResult(@RequestBody ResultDto resultDto) {
        return resultService.addResult(resultDto)
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }

    @GetMapping("/appointment/{id}")
    public List<ResultDto> getResultsForAppointment(@PathVariable Long id) {
        return resultService.getResultsForAppointment(id);
    }

    @GetMapping("all")
    public List<ResultDto> getAllResults() {
        return resultService.getAllResults();
    }

}
