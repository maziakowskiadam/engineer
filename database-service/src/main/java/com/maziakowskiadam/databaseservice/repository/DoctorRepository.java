package com.maziakowskiadam.databaseservice.repository;

import com.maziakowskiadam.databaseservice.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

}
