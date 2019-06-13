package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.dto.AddDoctorDto;
import com.maziakowskiadam.databaseservice.dto.DoctorDto;
import com.maziakowskiadam.databaseservice.dto.Mapping;
import com.maziakowskiadam.databaseservice.entity.Doctor;
import com.maziakowskiadam.databaseservice.entity.Specialization;
import com.maziakowskiadam.databaseservice.repository.DoctorRepository;
import com.maziakowskiadam.databaseservice.repository.SpecializationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    IdentityService identityService;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    SpecializationRepository specializationRepository;

    public boolean addDoctor(AddDoctorDto addDoctorDto) {

        String identityId;
        try {
            identityId = identityService.registerDoctorIdentity(addDoctorDto.getIdentity());
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }

        if (identityId == null) {
            return false;
        }

        try {
            DoctorDto doctor = addDoctorDto.getDoctor();

            Optional<Specialization> optionalSpec = specializationRepository.findSpecializationByName(doctor.getSpecialization());

            if (!optionalSpec.isPresent()) {
                Specialization newSpec = new Specialization();
                newSpec.setName(doctor.getSpecialization());
                specializationRepository.save(newSpec);
            }

            Specialization spec = specializationRepository.findSpecializationByName(doctor.getSpecialization()).get();
            String firstName = doctor.getFirstName();
            String lastName = doctor.getLastName();
            Optional<Doctor> optionalDoc = doctorRepository.findDoctorByFirstNameAndLastNameAndSpec(firstName, lastName, spec);

            if (!optionalDoc.isPresent()) {
                Doctor newDoctor = new Doctor();
                newDoctor.setFirstName(firstName);
                newDoctor.setLastName(lastName);
                newDoctor.setSpec(spec);
                newDoctor.setIdentityId(identityId);
                doctorRepository.save(newDoctor);
            } else {
                throw new Exception("Doctor already in database!");
            }

            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    public DoctorDto getDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id).get();

        return Mapping.doctorAsDto(doctor);
    }



    public List<DoctorDto> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        List<DoctorDto> dtos = new ArrayList<>();

        for (Doctor d : doctors) {
            dtos.add(Mapping.doctorAsDto(d));
        }

        return dtos;
    }

    public String deleteDoctor(Long id) {
        try {
            doctorRepository.deleteById(id);
            return "Doctor deleted";
        } catch (Exception e) {
            e.printStackTrace();
            return "Doctor couldn't be deleted";
        }
    }

    @Transactional
    public String editDoctor(Long id, AddDoctorDto addDoctorDto) {
//        try {
//            Doctor doctor = doctorRepository.findById(id).get();
//
//            doctor.setFirstName(addDoctorDto.getFirstName());
//            doctor.setLastName(addDoctorDto.getLastName());
//
//            Optional<Specialization> optionalSpec = specializationRepository.findSpecializationByName(addDoctorDto.getSpecialization());
//
//            if (optionalSpec.isPresent()) {
//                System.out.println("specka istnieje");
//            } else {
//                Specialization newSpec = new Specialization();
//                newSpec.setName(addDoctorDto.getSpecialization());
//                specializationRepository.save(newSpec);
//                Specialization spec = specializationRepository.findSpecializationByName(addDoctorDto.getSpecialization()).get();
//                doctor.setSpec(spec);
//            }
//
//            return "Doctor edited";
//        } catch (Exception e) {
//            e.printStackTrace();
            return "Doctor couldn't be edited";
//        }
    }

    public List<DoctorDto> getDoctorsBySpec(Long id) {
        Specialization spec = specializationRepository.findById(id).get();
        List<Doctor> doctors = doctorRepository.findDoctorsBySpec(spec);
        List<DoctorDto> dtos = new ArrayList<>();

        for (Doctor d : doctors) {
            dtos.add(Mapping.doctorAsDto(d));
        }

        return dtos;
    }
}
