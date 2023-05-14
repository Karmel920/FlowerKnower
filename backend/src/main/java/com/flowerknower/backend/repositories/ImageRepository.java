package com.flowerknower.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flowerknower.backend.model.entities.Image;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long>{
    Optional<Image> findByNameAndId(String fileName, Long id);
}
