package com.flowerknower.backend.controllers;

import com.flowerknower.backend.model.requests.*;
import com.flowerknower.backend.model.responses.*;
import com.flowerknower.backend.services.authentication.AuthenticationService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins="http://localhost:3000")
public class AuthenticationController {

    private final AuthenticationService authenticationService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

}
