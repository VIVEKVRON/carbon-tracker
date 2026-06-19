package com.example.carbontracker.dto;

import com.example.carbontracker.model.Category;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CarbonLogRequest {
    @NotNull(message = "Category is required")
    private Category category;

    @NotNull(message = "Value is required")
    @Positive(message = "Value must be positive")
    private Double value;
}
