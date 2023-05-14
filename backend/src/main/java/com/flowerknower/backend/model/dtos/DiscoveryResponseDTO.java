package com.flowerknower.backend.model.dtos;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiscoveryResponseDTO {
    private Long id;
    private String name;
    private String description;
    private byte[] image;
    private DiscoveryLocationDTO discoveryLocation;
    private LocalDate date;
}