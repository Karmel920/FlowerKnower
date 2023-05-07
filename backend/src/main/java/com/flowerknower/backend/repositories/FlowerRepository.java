package com.flowerknower.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.flowerknower.backend.model.entities.Flower;

@Repository
public interface FlowerRepository extends JpaRepository<Flower, Long> {
    Optional<Flower> findByName(String name);
}
