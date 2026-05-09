package com.rickandmorty.backend.dto;

import lombok.Data;

@Data
public class CharacterRequestDTO {
    private String name;
    private String species;
    private String status;
    private String origin;
    private String imageName;
    private String imageData; // Base64
}