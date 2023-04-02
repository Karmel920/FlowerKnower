package com.flowerknower.backend.model.entities;

import com.flowerknower.backend.model.records.Localisation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "plant_id")
    private Image image;

    private String name;

    private String data;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Localisation localisation;
}
