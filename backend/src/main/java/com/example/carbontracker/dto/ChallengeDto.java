package com.example.carbontracker.dto;

import com.example.carbontracker.model.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeDto {
    private UUID id;
    private String title;
    private String description;
    private Double targetValue;
    private Category category;
    private Integer durationDays;
}
