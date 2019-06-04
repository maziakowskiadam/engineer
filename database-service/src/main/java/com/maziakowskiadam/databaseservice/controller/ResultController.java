package com.maziakowskiadam.databaseservice.controller;


import com.maziakowskiadam.databaseservice.dto.ResultDto;
import com.maziakowskiadam.databaseservice.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/results")
@CrossOrigin
public class ResultController {

    @Autowired
    ResultService resultService;

    @PostMapping("/add")
    public String addResult(@RequestBody ResultDto resultDto) {
        return resultService.addResult(resultDto);
    }

    @GetMapping("/appointment/{id}")
    public List<ResultDto> getResultsForAppointment(@PathVariable Long id) {
        return resultService.getResultsForAppointment(id);
    }

}
