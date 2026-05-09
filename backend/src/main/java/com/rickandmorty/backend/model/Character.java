package com.rickandmorty.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "characters")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String species; // ex: "Human", "Alien", "Robot"

    @Column(nullable = false)
    private String status; // "Alive", "Dead", "Unknown"

    @Column(nullable = false)
    private String origin; // planeta/local de origem

    @Column(name = "image_name", nullable = false)
    private String imageName; // nome do arquivo de imagem

    @Column(name = "image_data", columnDefinition = "TEXT")
    private String imageData; // imagem em Base64
}