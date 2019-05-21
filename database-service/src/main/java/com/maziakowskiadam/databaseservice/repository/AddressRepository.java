package com.maziakowskiadam.databaseservice.repository;

import com.maziakowskiadam.databaseservice.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findAddressById(Long id);
}
