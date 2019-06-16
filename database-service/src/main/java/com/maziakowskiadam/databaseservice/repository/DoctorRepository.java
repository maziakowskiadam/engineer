package com.maziakowskiadam.databaseservice.repository;

import com.maziakowskiadam.databaseservice.entity.Doctor;
import com.maziakowskiadam.databaseservice.entity.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findDoctorByFirstNameAndLastNameAndSpec(String firstName, String lastName, Specialization specialization);
    List<Doctor> findDoctorsBySpec(Specialization specialization);
    Doctor findByIdentityId(String identityId);
}
