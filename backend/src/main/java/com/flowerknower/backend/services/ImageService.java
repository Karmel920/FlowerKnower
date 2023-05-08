package com.flowerknower.backend.services;

import com.flowerknower.backend.model.enums.BucketName;
import com.flowerknower.backend.repositories.ImageRepository;
import com.flowerknower.backend.services.aws.FileStore;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.flowerknower.backend.model.entities.Image;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.*;

import static org.apache.http.entity.ContentType.*;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;
    private final FileStore fileStore;

    public Image uploadImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot upload empty file");
        }
        if (!Arrays.asList(IMAGE_PNG.getMimeType(),
                IMAGE_BMP.getMimeType(),
                IMAGE_GIF.getMimeType(),
                IMAGE_JPEG.getMimeType()).contains(file.getContentType())) {
            throw new IllegalStateException("FIle uploaded is not an image");
        }
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        // String fullPath=PATH+file.getOriginalFilename();
        String path = String.format("%s/%s", BucketName.FLOWERKNOWER_IMAGE.getBucketName(), UUID.randomUUID());
        String fileName = String.format("%s", file.getOriginalFilename());
        try {
            fileStore.upload(path, fileName, Optional.of(metadata), file.getInputStream());
        } catch (IOException e) {
            throw new IllegalStateException("Failed to upload file", e);
        }
        Image image = Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imagePath(path)
                .build();
        // file.transferTo(new File(fullPath));
        return imageRepository.save(image);
    }

    public byte[] downloadImage(String fileName, Long id) throws IOException {
        Optional<Image> image = imageRepository.findByNameAndId(fileName, id);
        // String fullPath = image.get().getImagePath();
        // return Files.readAllBytes(new File(fullPath).toPath());
        return fileStore.download(image.get().getImagePath(), image.get().getName());
    }
}
