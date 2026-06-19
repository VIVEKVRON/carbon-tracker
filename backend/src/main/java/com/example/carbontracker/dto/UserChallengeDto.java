package com.example.carbontracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserChallengeDto {
    private UUID id;
    private ChallengeDto challenge;
    private LocalDateTime startDate;
    private Integer currentStreak;
    private Boolean isCompleted;
}
