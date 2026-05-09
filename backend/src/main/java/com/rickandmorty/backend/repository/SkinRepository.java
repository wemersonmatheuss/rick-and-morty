package com.rickandmorty.backend.repository;

import com.rickandmorty.backend.model.Skin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkinRepository extends JpaRepository<Skin, Long> {
    boolean existsBySkinId(String skinId);
}