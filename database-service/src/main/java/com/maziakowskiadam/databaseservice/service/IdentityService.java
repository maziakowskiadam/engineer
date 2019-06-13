package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.dto.IdentityDto;
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

    public String registerPatientIdentity(IdentityDto identityDto) {
        return sendRequest(identityDto, "RegisterPatient");
    }


    public String registerDoctorIdentity(IdentityDto identityDto) {
        return sendRequest(identityDto, "RegisterDoctor");
    }

    private String sendRequest(IdentityDto identityDto, String path) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("email", identityDto.getEmail());
        map.add("password", identityDto.getPassword());

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.postForObject(IDENTITY_URL + "/Identity/" + path , request, String.class);

        return result;
    }

}
