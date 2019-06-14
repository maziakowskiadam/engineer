package com.maziakowskiadam.databaseservice.controller;


import com.maziakowskiadam.databaseservice.dto.AddManagementDto;
import com.maziakowskiadam.databaseservice.dto.AddPatientDto;
import com.maziakowskiadam.databaseservice.service.ManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/management")
@CrossOrigin
public class ManagementController {

    @Autowired
    ManagementService managementService;

    @PostMapping("/add")
    public ResponseEntity addManagement(@RequestBody AddManagementDto addManagementDto) {
        return managementService.addManagement(addManagementDto)
                ? new ResponseEntity(HttpStatus.OK)
                : new ResponseEntity(HttpStatus.BAD_REQUEST);
    }


}
