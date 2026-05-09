package com.rickandmorty.backend.strategy;

import com.rickandmorty.backend.dto.CharacterRequestDTO;

public interface CharacterValidationStrategy {
    void validate(CharacterRequestDTO dto);
}