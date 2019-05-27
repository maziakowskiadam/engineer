package com.maziakowskiadam.databaseservice.repository;

import com.maziakowskiadam.databaseservice.entity.ExaminationType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExaminationTypeRepository extends JpaRepository<ExaminationType, Long> {

    Optional<ExaminationType> findByName(String name);
}
