package com.maziakowskiadam.databaseservice.controller;

import com.maziakowskiadam.databaseservice.dto.RoomDto;
import com.maziakowskiadam.databaseservice.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@CrossOrigin
public class RoomController {

    @Autowired
    RoomService roomService;


//    @PostMapping("/add")
//    public String addRoom(@RequestBody RoomDto roomDto) {
//        return roomService.addRoom(roomDto);
//    }

    @PostMapping("/add")
    public ResponseEntity addRoom(@RequestBody RoomDto roomDto) {
        return roomService.addRoom(roomDto)
                ? new ResponseEntity(HttpStatus.OK)
                : new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}")
    public RoomDto getRoom(@PathVariable Long id) {
        return roomService.getRoom(id);
    }

    @GetMapping("/all")
    public List<RoomDto> getAllRooms() {
        return roomService.getAllRooms();
    }
}

