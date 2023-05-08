package com.flowerknower.backend.controllers;

import com.flowerknower.backend.model.dtos.DiscoveryRequestDTO;
import com.flowerknower.backend.model.dtos.DiscoveryResponseDTO;
import com.flowerknower.backend.model.dtos.UniqueDiscoveriesAmountDTO;
import com.flowerknower.backend.model.entities.Discovery;
import com.flowerknower.backend.model.entities.User;
import com.flowerknower.backend.services.DiscoveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/discovery")
public class DiscoveryController {

    private final DiscoveryService discoveryService;

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void submitDiscovery(
            @AuthenticationPrincipal User user,
            @RequestParam("image") MultipartFile file,
            @ModelAttribute DiscoveryRequestDTO discovery) throws IOException {
        discoveryService.submitDiscovery(file, user, discovery);
    }

    @GetMapping("{discoveryId}")
    public ResponseEntity<DiscoveryResponseDTO> getDiscovery(@PathVariable Long discoveryId) throws IOException {
        return ResponseEntity.ok(discoveryService.getDiscovery(discoveryId));
    }

    @GetMapping()
    public ResponseEntity<List<DiscoveryResponseDTO>> getAllDiscoveries(@AuthenticationPrincipal User user)
            throws IOException {
        return ResponseEntity.ok(discoveryService.getAllDiscoveriesByUser(user));
    }

    @GetMapping("/unique")
    public ResponseEntity<UniqueDiscoveriesAmountDTO> getNumberOfUniqueDiscoveries(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(discoveryService.getUniqueDiscoveriesByUser(user));
    }
}
