package com.flowerknower.backend.controllers;

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

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/discovery")
@CrossOrigin(origins="http://localhost:3000")
public class DiscoveryController {

    private final DiscoveryService discoveryService;

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Discovery> submitDiscovery (@AuthenticationPrincipal User user, @RequestParam("image") MultipartFile file, @RequestParam("prediction") String prediction) throws IOException {
        Discovery discovery = discoveryService.submitDiscovery(file, user, prediction);
        return ResponseEntity.ok(discovery);
    }

    @GetMapping("{discoveryId}")
    public ResponseEntity<Discovery> getDiscovery(@PathVariable Long discoveryId) {
        return ResponseEntity.ok(discoveryService.getDiscovery(discoveryId));
    }
}
