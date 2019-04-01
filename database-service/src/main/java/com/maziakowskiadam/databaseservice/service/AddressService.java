package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.entity.Address;
import com.maziakowskiadam.databaseservice.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    AddressRepository addressRepository;

    public List<Address> getAddresses() {
        return addressRepository.findAll();
    }

    public String addAddress(Address newAddress) {

        try {
            addressRepository.save(newAddress);
            return "Address added.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Address couldn't be added.";
        }


    }


}
