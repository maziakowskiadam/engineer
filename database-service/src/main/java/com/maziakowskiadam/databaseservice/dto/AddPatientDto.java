package com.maziakowskiadam.databaseservice.dto;

public class AddPatientDto {

    private PatientDataDto patient;
    private IdentityDto identity;

    public PatientDataDto getPatient() {
        return patient;
    }

    public void setPatient(PatientDataDto patient) {
        this.patient = patient;
    }

    public IdentityDto getIdentity() {
        return identity;
    }

    public void setIdentity(IdentityDto identity) {
        this.identity = identity;
    }
}
