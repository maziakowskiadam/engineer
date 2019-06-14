package com.maziakowskiadam.databaseservice.dto;

public class AddManagementDto {

    private IdentityDto identity;
    private ManagementDto management;

    public IdentityDto getIdentity() {
        return identity;
    }

    public void setIdentity(IdentityDto identity) {
        this.identity = identity;
    }

    public ManagementDto getManagement() {
        return management;
    }

    public void setManagement(ManagementDto management) {
        this.management = management;
    }
}
