package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.dto.AddressDto;
import com.maziakowskiadam.databaseservice.tools.Mapping;
import com.maziakowskiadam.databaseservice.entity.Address;
import com.maziakowskiadam.databaseservice.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AddressService {

    @Autowired
    AddressRepository addressRepository;

    public List<AddressDto> getAddresses() {

        List<Address> addresses = new ArrayList<>();
        List<AddressDto> dtos = new ArrayList<>();
        addresses = addressRepository.findAll();

        for (Address a : addresses) {
            dtos.add(Mapping.addressAsDto(a));
        }

        return dtos;
    }

    public String addAddress(Address newAddress) {
        try {

            String street = newAddress.getStreet();
            String house = newAddress.getHouse();
            String zipcode = newAddress.getZipcode();
            String city = newAddress.getCity();

            Optional<Address> optAddress = addressRepository.findAddressByStreetAndHouseAndZipcodeAndCity(street, house,zipcode, city);

            if (!optAddress.isPresent()){
                addressRepository.save(newAddress);
                return "Address added.";
            } else {
                throw new Exception("Address already in database");
            }

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

    public AddressDto getAddressById(Long id) {
        Address address = addressRepository.findById(id).get();
        return Mapping.addressAsDto(address);
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
