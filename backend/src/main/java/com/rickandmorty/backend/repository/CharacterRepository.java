package com.rickandmorty.backend.repository;

import com.rickandmorty.backend.model.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Long> {
    List<Character> findBySpecies(String species);
    List<Character> findByStatus(String status);
    boolean existsByName(String name);
}