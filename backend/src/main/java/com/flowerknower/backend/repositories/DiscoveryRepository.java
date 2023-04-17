package com.flowerknower.backend.repositories;

import com.flowerknower.backend.model.entities.Discovery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscoveryRepository extends JpaRepository<Discovery, Long> {
}
