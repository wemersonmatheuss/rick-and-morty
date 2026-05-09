package com.rickandmorty.backend.strategy;

import com.rickandmorty.backend.dto.CharacterRequestDTO;
import org.springframework.stereotype.Component;

@Component
public class NameValidationStrategy implements CharacterValidationStrategy {

    @Override
    public void validate(CharacterRequestDTO dto) {
        if (dto.getName() == null || dto.getName().trim().length() < 2) {
            throw new IllegalArgumentException("Nome deve ter pelo menos 2 caracteres.");
        }
    }
}