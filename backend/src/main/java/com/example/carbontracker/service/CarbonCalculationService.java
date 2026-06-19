package com.example.carbontracker.service;

import com.example.carbontracker.model.Category;
import org.springframework.stereotype.Service;

@Service
public class CarbonCalculationService {

    private static final double TRANSPORTATION_FACTOR = 0.17; // kg CO2 per km
    private static final double ENERGY_FACTOR = 0.45; // kg CO2 per kWh
    private static final double DIET_FACTOR = 2.5; // kg CO2 per meal

    public double calculateEmissions(Category category, double value) {
        if (value < 0) {
            throw new IllegalArgumentException("Input value cannot be negative");
        }

        return switch (category) {
            case TRANSPORTATION -> value * TRANSPORTATION_FACTOR;
            case ENERGY -> value * ENERGY_FACTOR;
            case DIET -> value * DIET_FACTOR;
            default -> throw new IllegalArgumentException("Unknown category: " + category);
        };
    }
}
