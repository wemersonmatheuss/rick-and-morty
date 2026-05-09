package com.rickandmorty.backend.controller;

import com.rickandmorty.backend.dto.CharacterRequestDTO;
import com.rickandmorty.backend.dto.CharacterResponseDTO;
import com.rickandmorty.backend.service.CharacterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/characters")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class CharacterController {

    private final CharacterService service;

    @PostMapping
    public ResponseEntity<CharacterResponseDTO> create(@RequestBody CharacterRequestDTO dto) {
        return ResponseEntity.status(201).body(service.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<CharacterResponseDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CharacterResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CharacterResponseDTO> update(
            @PathVariable Long id,
            @RequestBody CharacterRequestDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}