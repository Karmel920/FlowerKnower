package com.flowerknower.backend.services;

import org.springframework.stereotype.Service;

import com.flowerknower.backend.model.entities.Discovery;
import com.flowerknower.backend.model.entities.DiscoveryLocation;
import com.flowerknower.backend.repositories.DiscoveryLocationRepository;
import com.flowerknower.backend.repositories.DiscoveryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MapService {
    private final DiscoveryLocationRepository locationRepository;
    private final DiscoveryRepository discoveryRepository;
    private final DiscoveryService discoveryService;

    // public DiscoveryLocation addLocation(Long discoveryId, DiscoveryLocation location) {
    //     DiscoveryLocation savedLocation = locationRepository.save(location);
    //     // Discovery discovery = discoveryService.getDiscovery(discoveryId);
    //     discovery.setLocation(savedLocation);
    //     discoveryRepository.save(discovery);
    //     return savedLocation;
    // }
    
}
