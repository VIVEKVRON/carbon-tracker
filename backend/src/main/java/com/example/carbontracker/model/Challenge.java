package com.example.carbontracker.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Entity
@Table(name = "challenges")
@Data
@NoArgsConstructor
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(name = "target_value")
    private Double targetValue;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(name = "duration_days", nullable = false)
    private Integer durationDays;
}
