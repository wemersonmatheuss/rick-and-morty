package com.rickandmorty.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skins")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Skin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String skinId; // ex: "rick", "morty"

    @Column(nullable = false)
    private String label; // ex: "Rick Clássico"

    @Column(name = "image_data", columnDefinition = "TEXT", nullable = false)
    private String imageData; // Base64
}