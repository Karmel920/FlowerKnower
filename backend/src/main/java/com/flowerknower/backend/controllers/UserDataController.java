package com.flowerknower.backend.controllers;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import com.flowerknower.backend.model.dtos.UserDataDTO;
import com.flowerknower.backend.model.dtos.UserProfileImageDTO;
import com.flowerknower.backend.model.entities.User;
import com.flowerknower.backend.model.requests.EmailChangeRequest;
import com.flowerknower.backend.model.requests.PasswordChangeRequest;
import com.flowerknower.backend.services.UserDataService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserDataController {

    private final UserDataService userDataService;

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }, value = "/picture")
    public void changeUserProfilePicture(@RequestParam("image") MultipartFile file,
            @AuthenticationPrincipal User user) throws IOException {
        userDataService.changeUserProfileImage(user, file);
    }

    @GetMapping("/picture")
    public ResponseEntity<UserProfileImageDTO> getUserProfileImage(@AuthenticationPrincipal User user)
            throws IOException {
        return ResponseEntity.ok(userDataService.getUserProfileImage(user));
    }

    @PostMapping("/email")
    public void changeUserEmail(@AuthenticationPrincipal User user, @RequestBody EmailChangeRequest emailChangeRequest) {
        userDataService.changeUserEmail(user, emailChangeRequest);
    }

    @PostMapping("/password")
    public void changeUserPassword(@AuthenticationPrincipal User user, @RequestBody PasswordChangeRequest passwordChangeRequest) {
        userDataService.changeUserPassword(user, passwordChangeRequest);
    }

    @DeleteMapping()
    public void deleteUser(@AuthenticationPrincipal User user) {
        userDataService.deleteUser(user);
    }

    @GetMapping
    public ResponseEntity<UserDataDTO> getUser(@AuthenticationPrincipal User user) throws IOException {
        return ResponseEntity.ok(userDataService.getUser(user));
    }
 }
