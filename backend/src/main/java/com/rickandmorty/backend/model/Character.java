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
    private String species;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String origin;

    @Column(name = "image_name", nullable = false)
    private String imageName;

    @Column(name = "image_data", columnDefinition = "TEXT")
    private String imageData;
}