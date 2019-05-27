package com.maziakowskiadam.databaseservice.dto;

import java.util.List;

public class AppointmentDto {

    private Long id;
    private String date;
    private String time;
    private Long patientId;
    private Long doctorId;
    private List<Long> resultIds;
    private Long roomId;
    private Long examinationTypeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public List<Long> getResultIds() {
        return resultIds;
    }

    public void setResultIds(List<Long> resultIds) {
        this.resultIds = resultIds;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public Long getExaminationTypeId() {
        return examinationTypeId;
    }

    public void setExaminationTypeId(Long examinationTypeId) {
        this.examinationTypeId = examinationTypeId;
    }
}
