package com.example.carbontracker.dto;

import com.example.carbontracker.model.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEmissionDto {
    private Category category;
    private Double totalEmissions;
}
