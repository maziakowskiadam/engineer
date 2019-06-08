package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.dto.PatientIdentityDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class IdentityService {

    private static String IDENTITY_URL = "http://localhost:5000";

    public String registerPatientIdentity(PatientIdentityDto patientIdentityDto) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("email", patientIdentityDto.getEmail());
        map.add("password", patientIdentityDto.getPassword());

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.postForObject(IDENTITY_URL + "/Identity/RegisterPatient", request, String.class);

        return result;
    }


}
