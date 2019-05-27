package com.maziakowskiadam.databaseservice.security;

public enum AppUserRole {
    PATIENT_UNAUTHORIZED("PATIENT_UNAUTHORIZED"),
    PATIENT("PATIENT"),
    DOCTOR("DOCTOR"),
    MANAGEMENT("MANAGEMENT");

    private String name;

    AppUserRole(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}
