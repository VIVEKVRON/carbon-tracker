package com.example.carbontracker.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "carbon_logs", indexes = {
    @Index(name = "idx_user_id", columnList = "user_id"),
    @Index(name = "idx_logged_at", columnList = "logged_at")
})
@Data
@NoArgsConstructor
public class CarbonLog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Column(nullable = false)
    private Double value;

    @Column(name = "co2_emissions_kg", nullable = false)
    private Double co2EmissionsKg;

    @Column(name = "logged_at", nullable = false)
    private LocalDateTime loggedAt;
}
