package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.dto.AddManagementDto;
import com.maziakowskiadam.databaseservice.dto.ManagementDto;
import com.maziakowskiadam.databaseservice.entity.Management;
import com.maziakowskiadam.databaseservice.repository.ManagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ManagementService {

    @Autowired
    IdentityService identityService;

    @Autowired
    ManagementRepository managementRepository;


    public boolean addManagement(AddManagementDto addManagementDto) {

        String identityId;
        try {
            identityId = identityService.registerManagement(addManagementDto.getIdentity());
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }

        if (identityId == null) {
            return false;
        }

        try {

            ManagementDto managementDto = addManagementDto.getManagement();
            Optional<Management> optManagement = managementRepository
                    .findByFirstNameAndLastNameAndDepartment(
                            managementDto.getFirstName(),
                            managementDto.getLastName(),
                            managementDto.getDepartment()
                    );

            if (!optManagement.isPresent()) {
                Management management = new Management();
                management.setFirstName(managementDto.getFirstName());
                management.setLastName(managementDto.getLastName());
                management.setDepartment(managementDto.getDepartment());
                management.setIdentityId(identityId);
                managementRepository.save(management);
            } else {
                throw new Exception("Doctor already in database!");
            }

            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
