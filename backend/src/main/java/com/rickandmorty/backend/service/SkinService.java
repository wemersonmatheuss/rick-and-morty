package com.rickandmorty.backend.service;

import com.rickandmorty.backend.dto.SkinRequestDTO;
import com.rickandmorty.backend.dto.SkinResponseDTO;
import com.rickandmorty.backend.model.Skin;
import com.rickandmorty.backend.repository.SkinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkinService {

    private final SkinRepository repository;

    public List<SkinResponseDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(s -> SkinResponseDTO.builder()
                        .id(s.getId())
                        .skinId(s.getSkinId())
                        .label(s.getLabel())
                        .imageData(s.getImageData())
                        .build())
                .collect(Collectors.toList());
    }

    public SkinResponseDTO create(SkinRequestDTO dto) {
        String skinId = dto.getLabel()
                .toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9]", "-")
                .replaceAll("-+", "-");

        if (repository.existsBySkinId(skinId)) {
            skinId = skinId + "-" + System.currentTimeMillis();
        }

        Skin skin = Skin.builder()
                .skinId(skinId)
                .label(dto.getLabel())
                .imageData(dto.getImageData())
                .build();

        Skin saved = repository.save(skin);

        return SkinResponseDTO.builder()
                .id(saved.getId())
                .skinId(saved.getSkinId())
                .label(saved.getLabel())
                .imageData(saved.getImageData())
                .build();
    }
}