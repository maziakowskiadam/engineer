package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.dto.Mapping;
import com.maziakowskiadam.databaseservice.dto.PatientDataDto;
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

    @Autowired
    IdentityService identityService;

    public List<PatientDto> getPatients() {
        List<Patient> patients = patientRepository.findAll();
        List<PatientDto> patientsDto = new ArrayList<>();

        for (Patient p : patients) {
            patientsDto.add(Mapping.patientAsDto(p));
        }

        return patientsDto;
    }

    public PatientDto getSinglePatient(Long id) {
        Patient patient = patientRepository.findById(id).get();
        PatientDto patientDto = Mapping.patientAsDto(patient);

        return patientDto;
    }


    @Transactional
    public boolean addPatient(RegisterPatientDto registerPatientDto) {
        String identityId;
        try {
            identityId = identityService.registerPatientIdentity(registerPatientDto.getIdentity());
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }

        if (identityId == null) {
            return false;
        }

        try {
            PatientDataDto patientDataDto = registerPatientDto.getPatient();
            Optional<Patient> optPatient = patientRepository.findPatientByPesel(patientDataDto.getPesel());

            if (!optPatient.isPresent()) {
                String street = patientDataDto.getStreet();
                String house = patientDataDto.getHouse();
                String zipcode = patientDataDto.getZipcode();
                String city = patientDataDto.getCity();
                Patient newPatient = new Patient();
                newPatient.setFirstName(patientDataDto.getFirstName());
                newPatient.setLastName(patientDataDto.getLastName());
                newPatient.setPesel(patientDataDto.getPesel());
                newPatient.setGender(patientDataDto.getGender());
                newPatient.setIdentityId(identityId);

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
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
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
//        try {
//
//            Patient oldPatient = patientRepository.findById(id).get();
//
//            oldPatient.setFirstName(registerPatientDto.getFirstName());
//            oldPatient.setLastName(registerPatientDto.getLastName());
//            oldPatient.setPesel(registerPatientDto.getPesel());
//            oldPatient.setGender(registerPatientDto.getGender());
//
//            String street = registerPatientDto.getStreet();
//            String house = registerPatientDto.getHouse();
//            String zipcode = registerPatientDto.getZipcode();
//            String city = registerPatientDto.getCity();
//
//            Address address = new Address();
//            address.setStreet(street);
//            address.setHouse(house);
//            address.setZipcode(zipcode);
//            address.setCity(city);
//
//            Optional<Address> optionalAddress = addressRepository
//                    .findAddressByStreetAndHouseAndZipcodeAndCity(street, house, zipcode, city);
//
//            if (!optionalAddress.isPresent()) {
//
//                addressService.addAddress(address);
//                Address newAddress = addressRepository.findAddressByStreetAndHouseAndZipcodeAndCity(street, house, zipcode, city).get();
//                oldPatient.setAddress(newAddress);
//                Address adres = oldPatient.getAddress();
//                System.out.println(adres);
//
//            }
//
//            return "Patient and his address edited.";
//        } catch (Exception e) {
//            e.printStackTrace();
            return "Patient couldn't be edited.";
//        }
    }
}
