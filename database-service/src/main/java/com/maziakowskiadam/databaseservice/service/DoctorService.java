package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.dto.AddDoctorDto;
import com.maziakowskiadam.databaseservice.entity.Doctor;
import com.maziakowskiadam.databaseservice.entity.Specialization;
import com.maziakowskiadam.databaseservice.repository.DoctorRepository;
import com.maziakowskiadam.databaseservice.repository.SpecializationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    SpecializationRepository specializationRepository;

    public String addDoctor(AddDoctorDto doctorDto) {
        try {
            Doctor newDoctor = new Doctor();
            newDoctor.setFirstName(doctorDto.getFirstName());
            newDoctor.setLastName(doctorDto.getLastName());

            Optional<Specialization> optionalSpec = specializationRepository.findSpecializationByName(doctorDto.getSpecialization());

            if (optionalSpec.isPresent()) {
                newDoctor.setSpec(optionalSpec.get());
            } else {
                Specialization newSpec = new Specialization();
                newSpec.setName(doctorDto.getSpecialization());
                specializationRepository.save(newSpec);
                Specialization spec = specializationRepository.findSpecializationByName(doctorDto.getSpecialization()).get();
                newDoctor.setSpec(spec);
            }

            doctorRepository.save(newDoctor);
            return "Doctor added.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Doctor couldn't be added.";
        }
    }


    public Doctor getDoctor(Long id) {
        return doctorRepository.findById(id).get();
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
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
        try {
            Doctor doctor = doctorRepository.findById(id).get();

            doctor.setFirstName(addDoctorDto.getFirstName());
            doctor.setLastName(addDoctorDto.getLastName());

            Optional<Specialization> optionalSpec = specializationRepository.findSpecializationByName(addDoctorDto.getSpecialization());

            if (optionalSpec.isPresent()) {
                System.out.println("specka istnieje");
            } else {
                Specialization newSpec = new Specialization();
                newSpec.setName(addDoctorDto.getSpecialization());
                specializationRepository.save(newSpec);
                Specialization spec = specializationRepository.findSpecializationByName(addDoctorDto.getSpecialization()).get();
                doctor.setSpec(spec);
            }

            return "Doctor edited";
        } catch (Exception e) {
            e.printStackTrace();
            return "Doctor couldn't be edited";
        }
    }
}
