package com.flowerknower.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flowerknower.backend.model.entities.Discovery;
import com.flowerknower.backend.model.entities.DiscoveryLocation;
import com.flowerknower.backend.services.DiscoveryService;
import com.flowerknower.backend.services.MapService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/discovery/{discoveryId}/location")
public class MapController {
    private final MapService mapService;
    // private final DiscoveryService discoveryService;

    // @PostMapping("")
    // public ResponseEntity<DiscoveryLocation> addLocation(@PathVariable Long discoveryId, @RequestBody DiscoveryLocation location) {
        
    //     DiscoveryLocation savedLocation = mapService.addLocation(discoveryId, location);

    //     return ResponseEntity.ok(savedLocation);
    // }
}

