package com.rickandmorty.backend.dto;

import lombok.*;

@Data
@Builder  // ← Builder Pattern aplicado aqui
public class CharacterResponseDTO {
    private Long id;
    private String name;
    private String species;
    private String status;
    private String origin;
    private String imageName;
    private String imageData;
}