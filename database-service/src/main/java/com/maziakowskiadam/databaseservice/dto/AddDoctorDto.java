package com.maziakowskiadam.databaseservice.dto;

public class AddDoctorDto {

    private DoctorDto doctor;

    private IdentityDto identity;


    public DoctorDto getDoctor() {
        return doctor;
    }

    public void setDoctor(DoctorDto doctor) {
        this.doctor = doctor;
    }

    public IdentityDto getIdentity() {
        return identity;
    }

    public void setIdentity(IdentityDto identity) {
        this.identity = identity;
    }
}
