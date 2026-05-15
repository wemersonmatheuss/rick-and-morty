package com.rickandmorty.backend.dto;

import lombok.Data;

@Data
public class SkinRequestDTO {
    private String skinId;
    private String label;
    private String imageData;
}