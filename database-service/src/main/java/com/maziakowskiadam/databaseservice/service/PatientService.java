package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.dto.PatientDto;
import com.maziakowskiadam.databaseservice.dto.RegisterDto;
import com.maziakowskiadam.databaseservice.entity.Address;
import com.maziakowskiadam.databaseservice.entity.Patient;
import com.maziakowskiadam.databaseservice.repository.AddressRepository;
import com.maziakowskiadam.databaseservice.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class PatientService {

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    AddressService addressService;

    public List<PatientDto> getPatients() {
        List<Patient> patients = patientRepository.findAll();
        List<PatientDto> patientsDto = new ArrayList<>();

        for (Patient p : patients) {
            PatientDto patientDto = turnPatientIntoDto(p);
            patientsDto.add(patientDto);
        }

        return patientsDto;
    }

    public PatientDto getSinglePatient(Long id) {
        Patient patient = patientRepository.findById(id).get();
        PatientDto patientDto = turnPatientIntoDto(patient);

        return patientDto;
    }

    public String addPatient(Patient patient) {
        try {

            patientRepository.save(patient);

            Patient justSaved = patientRepository.findPatientByPesel(patient.getPesel());

            return "Patient added.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Patient couldn't be added.";
        }
    }

    @Transactional
    public String addAddressToPatient(Long patientId, Long addressId) {
        try {

            Patient patient = patientRepository.findById(patientId).get();
            Address address = addressRepository.findById(addressId).get();

            patient.setAddress(address);

            return "Address added to patient.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Address couldn't be added to patient.";
        }
    }

    @Transactional
    public String addPatientWithAddress(RegisterDto registerDto) {
        try {
            String street = registerDto.getStreet();
            String house = registerDto.getHouse();
            String zipcode = registerDto.getZipcode();
            String city = registerDto.getCity();
            Optional<Address> optionalAddress = addressRepository.findAddressByStreetAndHouseAndZipcodeAndCity(street, house, zipcode, city);

            Patient newPatient = new Patient();
            newPatient.setFirstName(registerDto.getFirstName());
            newPatient.setLastName(registerDto.getLastName());
            newPatient.setPesel(registerDto.getPesel());
            newPatient.setGender(registerDto.getGender());


            if (optionalAddress.isPresent()) {
                Address address = optionalAddress.get();
                newPatient.setAddress(address);
                patientRepository.save(newPatient);
            } else {
                Address address = optionalAddress.get();
                addressService.addAddress(address);
                Address newAddress = addressRepository.findAddressByStreetAndHouseAndZipcodeAndCity(street, house, zipcode, city).get();
                newPatient.setAddress(newAddress);
                patientRepository.save(newPatient);

            }


            return "Patient and address added.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Patient and address couldn't be added.";
        }
    }


    public PatientDto turnPatientIntoDto(Patient patient) {
        PatientDto patientDto = new PatientDto();

        patientDto.setId(patient.getId());
        patientDto.setFirstName(patient.getFirstName());
        patientDto.setLastName(patient.getLastName());
        patientDto.setPesel(patient.getPesel());
        patientDto.setGender(patient.getGender());
        patientDto.setAddressId(patient.getAddress().getId());

        return patientDto;
    }
}
