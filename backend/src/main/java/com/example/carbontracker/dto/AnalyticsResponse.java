package com.example.carbontracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {
    private double totalEmissionsLast30Days;
    private List<CategoryEmissionDto> categoryEmissions;
}
