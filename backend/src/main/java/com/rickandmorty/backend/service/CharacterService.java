package com.rickandmorty.backend.service;

import com.rickandmorty.backend.dto.CharacterRequestDTO;
import com.rickandmorty.backend.dto.CharacterResponseDTO;
import com.rickandmorty.backend.model.Character;
import com.rickandmorty.backend.repository.CharacterRepository;
import com.rickandmorty.backend.strategy.CharacterValidationStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final CharacterRepository repository;
    private final List<CharacterValidationStrategy> validationStrategies;

    public CharacterResponseDTO create(CharacterRequestDTO dto) {
        validationStrategies.forEach(s -> s.validate(dto));

        Character character = Character.builder()
                .name(dto.getName())
                .species(dto.getSpecies())
                .status(dto.getStatus())
                .origin(dto.getOrigin())
                .imageName(dto.getImageName())
                .imageData(dto.getImageData())
                .build();

        Character saved = repository.save(character);
        return toResponse(saved);
    }

    public List<CharacterResponseDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public CharacterResponseDTO findById(Long id) {
        Character c = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Personagem não encontrado: " + id));
        return toResponse(c);
    }

    public CharacterResponseDTO update(Long id, CharacterRequestDTO dto) {
        validationStrategies.forEach(s -> s.validate(dto));

        Character c = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Personagem não encontrado: " + id));

        c.setName(dto.getName());
        c.setSpecies(dto.getSpecies());
        c.setStatus(dto.getStatus());
        c.setOrigin(dto.getOrigin());
        c.setImageName(dto.getImageName());
        if (dto.getImageData() != null) {
            c.setImageData(dto.getImageData());
        }

        return toResponse(repository.save(c));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Personagem não encontrado: " + id);
        }
        repository.deleteById(id);
    }

    private CharacterResponseDTO toResponse(Character c) {
        return CharacterResponseDTO.builder()
                .id(c.getId())
                .name(c.getName())
                .species(c.getSpecies())
                .status(c.getStatus())
                .origin(c.getOrigin())
                .imageName(c.getImageName())
                .imageData(c.getImageData())
                .build();
    }
}