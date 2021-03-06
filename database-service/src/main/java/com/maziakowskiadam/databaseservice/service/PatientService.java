package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.dto.UserRoleDto;
import com.maziakowskiadam.databaseservice.tools.Mapping;
import com.maziakowskiadam.databaseservice.dto.PatientDataDto;
import com.maziakowskiadam.databaseservice.dto.PatientDto;
import com.maziakowskiadam.databaseservice.dto.AddPatientDto;
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
import java.util.stream.Collectors;
import java.util.stream.Stream;


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
        List<UserRoleDto> roles = identityService.getUserRoles();
        List<PatientDto> patientDtos = new ArrayList<>();

        for (Patient p : patients) {
            patientDtos.add(Mapping.patientAsDto(p));
        }

        return patientDtos;


//        Stream<UserRoleDto> userRoles = identityService.getUserRoles().stream();
//
//        return patients.stream()
//                .map(patient -> {
//                    PatientDto dto = Mapping.patientAsDto(patient);
//                    UserRoleDto role = userRoles.filter(x -> x.getIdentityId().equals(dto.getIdentityId()))
//                            .findFirst()
//                            .get();
//
//                    dto.setRole(role.getRoleName());
//
//                    return dto;
//                }).collect(Collectors.toList());
    }

    public PatientDto getSinglePatient(Long id) {
        Patient patient = patientRepository.findById(id).get();
        PatientDto patientDto = Mapping.patientAsDto(patient);

        return patientDto;
    }


    @Transactional
    public boolean addPatient(AddPatientDto addPatientDto) {
        String identityId;
        try {
            identityId = identityService.registerPatientIdentity(addPatientDto.getIdentity());
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }

        if (identityId == null) {
            return false;
        }

        return addPatientToDb(addPatientDto, identityId);
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
    public String editPatient(Long id, AddPatientDto addPatientDto) {
//        try {
//
//            Patient oldPatient = patientRepository.findById(id).get();
//
//            oldPatient.setFirstName(addPatientDto.getFirstName());
//            oldPatient.setLastName(addPatientDto.getLastName());
//            oldPatient.setPesel(addPatientDto.getPesel());
//            oldPatient.setGender(addPatientDto.getGender());
//
//            String street = addPatientDto.getStreet();
//            String house = addPatientDto.getHouse();
//            String zipcode = addPatientDto.getZipcode();
//            String city = addPatientDto.getCity();
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

    @Transactional
    public boolean addPatientUnauthorized(AddPatientDto addPatientDto) {
        String identityId;
        try {
            identityId = identityService.registerPatientUnauthorizedIdentity(addPatientDto.getIdentity());
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }

        if (identityId == null) {
            return false;
        }

        return addPatientToDb(addPatientDto, identityId);
    }

    private boolean addPatientToDb(AddPatientDto addPatientDto, String identityId) {
        try {
            PatientDataDto patientDataDto = addPatientDto.getPatient();
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


    public boolean authorizePatient(String identityId) {

        try {


            identityService.authorizePatient(identityId);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
