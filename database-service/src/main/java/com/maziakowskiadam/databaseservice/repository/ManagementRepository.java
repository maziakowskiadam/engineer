package com.maziakowskiadam.databaseservice.repository;


import com.maziakowskiadam.databaseservice.entity.Management;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ManagementRepository extends JpaRepository<Management, Long> {
    Optional<Management> findByFirstNameAndLastNameAndDepartment(String firstName, String lastName, String department);
}
