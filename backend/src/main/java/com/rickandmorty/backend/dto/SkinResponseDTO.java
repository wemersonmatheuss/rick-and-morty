package com.rickandmorty.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SkinResponseDTO {
    private Long id;
    private String skinId;
    private String label;
    private String imageData;
}