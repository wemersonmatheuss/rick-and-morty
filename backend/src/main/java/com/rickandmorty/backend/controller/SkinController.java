package com.rickandmorty.backend.controller;

import com.rickandmorty.backend.dto.SkinRequestDTO;
import com.rickandmorty.backend.dto.SkinResponseDTO;
import com.rickandmorty.backend.service.SkinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skins")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class SkinController {

    private final SkinService service;

    @GetMapping
    public ResponseEntity<List<SkinResponseDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping
    public ResponseEntity<SkinResponseDTO> create(@RequestBody SkinRequestDTO dto) {
        return ResponseEntity.status(201).body(service.create(dto));
    }
}