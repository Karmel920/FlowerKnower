package com.flowerknower.backend.model.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiscoveryRequestDTO {
    private String name;
    private String description;
    private DiscoveryLocationDTO discoveryLocation;
}
