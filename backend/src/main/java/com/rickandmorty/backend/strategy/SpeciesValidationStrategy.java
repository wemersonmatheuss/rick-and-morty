package com.rickandmorty.backend.strategy;

import com.rickandmorty.backend.dto.CharacterRequestDTO;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class SpeciesValidationStrategy implements CharacterValidationStrategy {

    private static final List<String> VALID_SPECIES =
            List.of("Human", "Alien", "Robot", "Humanoid", "Animal", "Cronenberg", "Unknown");

    @Override
    public void validate(CharacterRequestDTO dto) {
        if (!VALID_SPECIES.contains(dto.getSpecies())) {
            throw new IllegalArgumentException("Espécie inválida: " + dto.getSpecies());
        }
    }
}