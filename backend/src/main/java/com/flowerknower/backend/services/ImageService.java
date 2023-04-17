package com.flowerknower.backend.services;

import com.flowerknower.backend.repositories.ImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.flowerknower.backend.model.entities.Image;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;
    @Value("${img.path}")
    private String PATH;
    
    public Image uploadImage(MultipartFile file) throws IOException {
        String fullPath=PATH+file.getOriginalFilename();
        Image image = Image.builder()
                            .name(file.getOriginalFilename())
                            .type(file.getContentType())
                            .imagePath(fullPath)
                            .build();
        file.transferTo(new File(fullPath));
        return imageRepository.save(image);
    }

    public byte[] downloadImage(String fileName) throws IOException{
        Optional<Image> image = imageRepository.findByName(fileName);
        String fullPath = image.get().getImagePath();
        return Files.readAllBytes(new File(fullPath).toPath());
    }
}
