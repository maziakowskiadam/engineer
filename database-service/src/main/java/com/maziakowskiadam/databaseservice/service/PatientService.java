package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.dto.PatientDto;
import com.maziakowskiadam.databaseservice.dto.RegisterPatientDto;
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
            patientsDto.add(turnPatientIntoDto(p));
        }

        return patientsDto;
    }

    public PatientDto getSinglePatient(Long id) {
        Patient patient = patientRepository.findById(id).get();
        PatientDto patientDto = turnPatientIntoDto(patient);

        return patientDto;
    }


    @Transactional
    public String addPatient(RegisterPatientDto registerPatientDto) {
        try {
            Optional<Patient> optPatient = patientRepository.findPatientByPesel(registerPatientDto.getPesel());

            if (!optPatient.isPresent()) {
                String street = registerPatientDto.getStreet();
                String house = registerPatientDto.getHouse();
                String zipcode = registerPatientDto.getZipcode();
                String city = registerPatientDto.getCity();
                Patient newPatient = new Patient();
                newPatient.setFirstName(registerPatientDto.getFirstName());
                newPatient.setLastName(registerPatientDto.getLastName());
                newPatient.setPesel(registerPatientDto.getPesel());
                newPatient.setGender(registerPatientDto.getGender());

                Optional<Address> optionalAddress = addressRepository.findAddressByStreetAndHouseAndZipcodeAndCity(street, house, zipcode, city);

                if (optionalAddress.isPresent()) {
                    Address address = optionalAddress.get();
                    newPatient.setAddress(address);
                    patientRepository.save(newPatient);
                } else {
                    Address address = new Address();
                    address.setStreet(street);
                    address.setHouse(house);
                    address.setZipcode(zipcode);
                    address.setCity(city);
                    addressService.addAddress(address);
                    Address newAddress = addressRepository.findAddressByStreetAndHouseAndZipcodeAndCity(street, house, zipcode, city).get();
                    newPatient.setAddress(newAddress);
                    patientRepository.save(newPatient);
                }
            } else {
                throw new Exception("Patient already in database. Pesel duplicated.");
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

    @Transactional
    public String deletePatientById(Long id) {

        try {
            patientRepository.deleteById(id);
            return "Patient deleted.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Patient couldn't be deleted.";
        }
    }

    @Transactional
    public String editPatient(Long id, RegisterPatientDto registerPatientDto) {
        try {

            Patient oldPatient = patientRepository.findById(id).get();

            oldPatient.setFirstName(registerPatientDto.getFirstName());
            oldPatient.setLastName(registerPatientDto.getLastName());
            oldPatient.setPesel(registerPatientDto.getPesel());
            oldPatient.setGender(registerPatientDto.getGender());

            String street = registerPatientDto.getStreet();
            String house = registerPatientDto.getHouse();
            String zipcode = registerPatientDto.getZipcode();
            String city = registerPatientDto.getCity();

            Address address = new Address();
            address.setStreet(street);
            address.setHouse(house);
            address.setZipcode(zipcode);
            address.setCity(city);

            Optional<Address> optionalAddress = addressRepository
                    .findAddressByStreetAndHouseAndZipcodeAndCity(street, house, zipcode, city);

            if (!optionalAddress.isPresent()) {

                addressService.addAddress(address);
                Address newAddress = addressRepository.findAddressByStreetAndHouseAndZipcodeAndCity(street, house, zipcode, city).get();
                oldPatient.setAddress(newAddress);
                Address adres = oldPatient.getAddress();
                System.out.println(adres);

            }

            return "Patient and his address edited.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Patient couldn't be edited.";
        }
    }
}
