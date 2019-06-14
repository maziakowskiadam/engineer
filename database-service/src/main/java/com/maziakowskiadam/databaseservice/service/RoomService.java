package com.maziakowskiadam.databaseservice.service;

import com.maziakowskiadam.databaseservice.tools.Mapping;
import com.maziakowskiadam.databaseservice.dto.RoomDto;
import com.maziakowskiadam.databaseservice.entity.Room;
import com.maziakowskiadam.databaseservice.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    RoomRepository roomRepository;

    public String addRoom(RoomDto dto) {

        try {
            Optional<Room> optionalRoom = roomRepository.findRoomByNumberAndFloor(dto.getNumber(), dto.getFloor());

            if (!optionalRoom.isPresent()) {
                Room newRoom = new Room();

                newRoom.setNumber(dto.getNumber());
                newRoom.setBuilding(dto.getBuilding());
                newRoom.setFloor(dto.getFloor());
                newRoom.setDescription(dto.getDescription());

                roomRepository.save(newRoom);
                return "Room added.";
            } else {
                throw new Exception("Room already in database");
            }


        } catch (Exception e) {
            e.printStackTrace();
            return "Room not added.";
        }

    }

    public RoomDto getRoom(Long id) {

        Optional<Room> optionalRoom = roomRepository.findById(id);

        if (optionalRoom.isPresent()) {
            return Mapping.roomAsDto(optionalRoom.get());
        } else {
            return null;
        }

    }

    public List<RoomDto> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        List<RoomDto> dtos = new ArrayList<>();

        for (Room r : rooms) {
            dtos.add(Mapping.roomAsDto(r));
        }

        return dtos;
    }
}

