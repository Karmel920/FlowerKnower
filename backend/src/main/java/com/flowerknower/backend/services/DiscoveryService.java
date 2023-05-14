package com.flowerknower.backend.services;

import com.flowerknower.backend.model.dtos.DiscoveryLocationDTO;
import com.flowerknower.backend.model.dtos.DiscoveryRequestDTO;
import com.flowerknower.backend.model.dtos.DiscoveryResponseDTO;
import com.flowerknower.backend.model.dtos.UniqueDiscoveriesAmountDTO;
import com.flowerknower.backend.model.entities.Discovery;
import com.flowerknower.backend.model.entities.DiscoveryLocation;
import com.flowerknower.backend.model.entities.Flower;
import com.flowerknower.backend.model.entities.Image;
import com.flowerknower.backend.model.entities.User;
import com.flowerknower.backend.repositories.DiscoveryLocationRepository;
import com.flowerknower.backend.repositories.DiscoveryRepository;
import com.flowerknower.backend.repositories.FlowerRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DiscoveryService {

    private final DiscoveryRepository discoveryRepository;
    private final DiscoveryLocationRepository discoveryLocationRepository;
    private final FlowerRepository flowerRepository;
    private final ImageService imageService;

    public void submitDiscovery(MultipartFile file, User user, DiscoveryRequestDTO discovery) throws IOException {
        Optional<Flower> flowerOptional = flowerRepository.findByName(discovery.getName());
        Flower flower = new Flower();
        if (flowerOptional.isPresent()) {
            flower = flowerOptional.get();
        } else {
            flower = flowerRepository
                    .save(Flower.builder()
                            .name(discovery.getName())
                            .description(discovery.getDescription()).build());
        }

        Image image = imageService.uploadImage(file);
        DiscoveryLocation discoveryLocation = discoveryLocationRepository.save(DiscoveryLocation
                .builder()
                .latitude(discovery.getDiscoveryLocation().getLatitude())
                .longitude(discovery.getDiscoveryLocation().getLongitude()).build());
        discoveryRepository.save(Discovery.builder()
                .user(user)
                .image(image)
                .flower(flower)
                .location(discoveryLocation)
                .date(LocalDate.now())
                .build());
    }

    public DiscoveryResponseDTO getDiscovery(Long discoveryId) throws IOException {
        Optional<Discovery> discoveryOptional = discoveryRepository.findById(discoveryId);
        if (discoveryOptional.isPresent()) {
            Discovery discovery = discoveryOptional.get();
            byte[] image = imageService.downloadImage(discovery.getImage().getName(), discovery.getImage().getId());
            return DiscoveryResponseDTO
                    .builder()
                    .date(discovery.getDate())
                    .id(discoveryId)
                    .name(discovery.getFlower().getName())
                    .description(discovery.getFlower().getDescription())
                    .image(image)
                    .discoveryLocation(DiscoveryLocationDTO
                            .builder()
                            .latitude(discovery.getLocation().getLatitude())
                            .longitude(discovery.getLocation().getLongitude())
                            .build())
                    .build();
        }
        throw new RuntimeException("Discovery does not exist!");
    }

    public List<DiscoveryResponseDTO> getAllDiscoveriesByUser(User user) throws IOException {
        List<Discovery> discoveries = discoveryRepository.findAllByUser(user);
        List<DiscoveryResponseDTO> discoveryDTOList = new ArrayList<>();
        for (Discovery discovery : discoveries) {
            byte[] image = imageService.downloadImage(discovery.getImage().getName(), discovery.getImage().getId());
            discoveryDTOList.add(DiscoveryResponseDTO
                    .builder()
                    .date(discovery.getDate())
                    .id(discovery.getId())
                    .name(discovery.getFlower().getName())
                    .description(discovery.getFlower().getDescription())
                    .image(image)
                    .discoveryLocation(DiscoveryLocationDTO
                            .builder()
                            .latitude(discovery.getLocation().getLatitude())
                            .longitude(discovery.getLocation().getLongitude())
                            .build())
                    .build());
        }
        return discoveryDTOList;
    }

    public UniqueDiscoveriesAmountDTO getUniqueDiscoveriesByUser(User user) {
        return UniqueDiscoveriesAmountDTO
                .builder()
                .uniqueFlowersCount(discoveryRepository.countDistinctFlowersByUser(user))
                .build();
    }
}
