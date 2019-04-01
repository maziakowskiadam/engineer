package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.entity.Patient;
import com.maziakowskiadam.databaseservice.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    PatientRepository patientRepository;

    public Patient getPatient(Long id) {
        return patientRepository.findPatientById(id);
    }

    public String registerPatient(Patient patient) {

        try {
            patientRepository.save(patient);
            return "Patient added.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Adding patient failed.";
        }
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Transactional
    public String deletePatient(Long id) {
        try {
            patientRepository.deleteById(id);
            return "Patient " + id + " deleted.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Deletion failed.";
        }
    }

    public String editPatient(Patient patient) {

        try {
            Patient editedPatient = patientRepository.getOne(patient.getId());
            editedPatient.setFirstName(patient.getFirstName());
            editedPatient.setLastName(patient.getLastName());
            editedPatient.setPesel(patient.getPesel());
            editedPatient.setGender(patient.getGender());
            patientRepository.save(editedPatient);

            return "Patient " + editedPatient.getId() + " edited.";

        } catch (Exception e) {
            e.printStackTrace();
            return "Something wrong with edition.";
        }


    }

}
