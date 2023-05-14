package com.flowerknower.backend.model.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDataDTO {
    private String email;
    private UserProfileImageDTO userProfileImageDTO;
    private UniqueDiscoveriesAmountDTO uniqueDiscoveriesAmountDTO;
}
