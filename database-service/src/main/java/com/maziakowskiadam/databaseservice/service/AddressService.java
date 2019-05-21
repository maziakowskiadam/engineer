package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.entity.Address;
import com.maziakowskiadam.databaseservice.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public String deleteAddressById(Long id) {
        try {
            addressRepository.deleteById(id);
            return "Address deleted.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Address couldn't be deleted.";
        }
    }

    public Address getAddressById(Long id) {

        return addressRepository.findAddressById(id);
    }

    @Transactional
    public String editAddress(Long id, Address newAddress) {
        try {
            Address oldAddress = addressRepository.findAddressById(id);
            oldAddress.setStreet(newAddress.getStreet());
            oldAddress.setHouse(newAddress.getHouse());
            oldAddress.setZipcode(newAddress.getZipcode());
            oldAddress.setCity(newAddress.getCity());

            return "Address edited.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Address couldn't be edited.";
        }
    }
}
