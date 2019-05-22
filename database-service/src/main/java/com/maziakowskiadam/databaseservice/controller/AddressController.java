package com.maziakowskiadam.databaseservice.controller;

import com.maziakowskiadam.databaseservice.dto.AddressDto;
import com.maziakowskiadam.databaseservice.entity.Address;
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
    public List<AddressDto> getAddresses() {
        return addressService.getAddresses();
    }

    @GetMapping("{id}")
    @ResponseBody
    public AddressDto getAddressById(@PathVariable Long id) {
        return addressService.getAddressById(id);
    }

    @PostMapping("/add")
    @ResponseBody
    public String addAddress(@RequestBody Address address) {

        return addressService.addAddress(address);
    }

    @GetMapping("/delete/{id}")
    @ResponseBody
    public String deleteAddress(@PathVariable Long id) {
        return addressService.deleteAddressById(id);
    }

    @PostMapping("/edit/{id}")
    @ResponseBody
    public String editAddress(@PathVariable Long id, @RequestBody Address newAddress) {
        return addressService.editAddress(id, newAddress);
    }
}
