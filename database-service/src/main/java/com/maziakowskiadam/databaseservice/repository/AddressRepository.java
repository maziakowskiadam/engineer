package com.maziakowskiadam.databaseservice.repository;

import com.maziakowskiadam.databaseservice.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findAddressById(Long id);
    Optional<Address> findAddressByStreetAndHouseAndZipcodeAndCity(String street, String house, String zipcode, String city);
}
