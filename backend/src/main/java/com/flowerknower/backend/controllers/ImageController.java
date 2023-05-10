package com.flowerknower.backend.controllers;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.flowerknower.backend.services.ImageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/image")
@RequiredArgsConstructor
public class ImageController {
	private final ImageService imageService;

	@ResponseStatus(value = HttpStatus.OK)
	@PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public void uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
		imageService.uploadImage(file);
	}

	@GetMapping("/download")
	public ResponseEntity<byte[]> downloadImage(@RequestParam String fileName, @RequestParam Long id)
			throws IOException {
		byte[] image = imageService.downloadImage(fileName, id);
		return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
	}

}
