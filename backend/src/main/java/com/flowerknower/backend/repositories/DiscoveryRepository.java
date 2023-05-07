package com.flowerknower.backend.repositories;

import com.flowerknower.backend.model.entities.Discovery;
import com.flowerknower.backend.model.entities.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscoveryRepository extends JpaRepository<Discovery, Long> {

    List<Discovery> findAllByUser(User user);
}
