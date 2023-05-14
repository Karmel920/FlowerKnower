package com.flowerknower.backend.model.requests;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmailChangeRequest {
    private String oldEmail;
    private String newEmail;
}