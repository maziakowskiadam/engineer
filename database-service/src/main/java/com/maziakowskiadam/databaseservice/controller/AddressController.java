package com.maziakowskiadam.databaseservice.controller;

import com.maziakowskiadam.databaseservice.entity.Address;
import com.maziakowskiadam.databaseservice.entity.Patient;
import com.maziakowskiadam.databaseservice.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/addresses")
public class AddressController {

    @Autowired
    AddressService addressService;

    @GetMapping("/all")
    public List<Address> getAdresses() {
        return addressService.getAddresses();
    }

    @PostMapping("/add")
    @ResponseBody
    public String registerPatient(@RequestBody Address address) {

        return addressService.addAddress(address);
    }


}
