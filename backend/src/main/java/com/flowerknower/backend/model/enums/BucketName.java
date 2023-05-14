package com.flowerknower.backend.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum BucketName {
    FLOWERKNOWER_IMAGE("flowerknower");

    private final String bucketName;
}
