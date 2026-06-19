package com.example.carbontracker.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "user_challenges", indexes = {
    @Index(name = "idx_uc_user_id", columnList = "user_id"),
    @Index(name = "idx_uc_challenge_id", columnList = "challenge_id")
})
@Data
@NoArgsConstructor
public class UserChallenge {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "current_streak", nullable = false)
    private Integer currentStreak = 0;

    @Column(name = "is_completed", nullable = false)
    private Boolean isCompleted = false;
}
