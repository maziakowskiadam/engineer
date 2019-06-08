package com.maziakowskiadam.databaseservice.dto;

public class RegisterPatientDto {

    private PatientDataDto patient;
    private PatientIdentityDto identity;

    public PatientDataDto getPatient() {
        return patient;
    }

    public void setPatient(PatientDataDto patient) {
        this.patient = patient;
    }

    public PatientIdentityDto getIdentity() {
        return identity;
    }

    public void setIdentity(PatientIdentityDto identity) {
        this.identity = identity;
    }
}
