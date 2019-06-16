package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.dto.IdentityDto;
import com.maziakowskiadam.databaseservice.dto.UserRoleDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class IdentityService {

    private static String IDENTITY_URL = "http://localhost:5000";

//    public String

    public String registerManagement(IdentityDto identityDto) {
        return sendRequest(identityDto, "RegisterManagement");
    }

    public String registerPatientIdentity(IdentityDto identityDto) {
        return sendRequest(identityDto, "RegisterPatient");
    }

    public String registerPatientUnauthorizedIdentity(IdentityDto identityDto) {
        return sendRequest(identityDto, "RegisterPatientUnauthorized");
    }

    public String registerDoctorIdentity(IdentityDto identityDto) {
        return sendRequest(identityDto, "RegisterDoctor");
    }

    public String authorizePatient(String identityId) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("identityId", identityId);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.postForObject(IDENTITY_URL + "/Patients/Authorize", request, String.class);

        return result;

    }

    public List<UserRoleDto> getUserRoles() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        RestTemplate restTemplate = new RestTemplate();
        UserRoleDto[] result = restTemplate.getForObject(IDENTITY_URL + "/Patients/All", UserRoleDto[].class);

        return Arrays.asList(result);
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
