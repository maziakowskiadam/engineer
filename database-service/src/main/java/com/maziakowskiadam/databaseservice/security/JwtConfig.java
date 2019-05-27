package com.maziakowskiadam.databaseservice.security;

import org.springframework.stereotype.Service;

@Service
public class JwtConfig {

    public static final String PATIENT_UNAUTHORIZED = "PATIENT_UNAUTHORIZED";
    public static final String PATIENT = "PATIENT";
    public static final String DOCTOR = "DOCTOR";
    public static final String MANAGEMENT = "MANAGEMENT";

    private String jwtKey = "6NTT5eWFKokfm2v5c1496MPDPL9CqkXqEe84BJ4D5ZDCvYai6lcTBv78mTVRHtRq";

    public String getJwtKey() {
        return jwtKey;
    }
}
