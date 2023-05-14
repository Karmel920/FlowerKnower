package com.flowerknower.backend.repositories;

import com.flowerknower.backend.model.entities.DiscoveryLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscoveryLocationRepository extends JpaRepository<DiscoveryLocation, Long> {
}
