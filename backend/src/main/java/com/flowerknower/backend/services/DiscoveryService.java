package com.flowerknower.backend.services;

import com.flowerknower.backend.model.entities.Discovery;
import com.flowerknower.backend.model.entities.Flower;
import com.flowerknower.backend.model.entities.Image;
import com.flowerknower.backend.model.entities.User;
import com.flowerknower.backend.repositories.DiscoveryRepository;
import com.flowerknower.backend.repositories.FlowerRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DiscoveryService {

    private final DiscoveryRepository discoveryRepository;
    private final FlowerRepository flowerRepository;
    private final ImageService imageService;

    public Discovery submitDiscovery(MultipartFile file, User user, String prediction) throws IOException {
        Optional<Flower> flowerOptional = flowerRepository.findByName(prediction);
        Flower predictedFlower = flowerOptional
            .orElseThrow( () -> new RuntimeException("Flower not found in database"));
        Image image = imageService.uploadImage(file);
        return Discovery.builder().user(user).image(image).flower(predictedFlower).build();
    }

    public Discovery getDiscovery(Long discoveryId) {
        Optional<Discovery> discoveryOptional = discoveryRepository.findById(discoveryId);
        if(discoveryOptional.isPresent()) {
            return discoveryOptional.get();
        }
        throw new RuntimeException("Discovery does not exist!");
    }

    public List<Discovery> getAllDiscoveriesByUser(User user) {
        return discoveryRepository.findAllByUser(user);
    }
}
