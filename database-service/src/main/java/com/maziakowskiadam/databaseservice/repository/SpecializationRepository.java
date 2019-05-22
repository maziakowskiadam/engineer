package com.maziakowskiadam.databaseservice.repository;

import com.maziakowskiadam.databaseservice.entity.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface SpecializationRepository extends JpaRepository<Specialization, Long> {
    Optional<Specialization> findSpecializationByName(String name);
}
