package com.example.carbontracker.service;

import com.example.carbontracker.model.Category;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class CarbonCalculationServiceTest {

    private CarbonCalculationService service;

    @BeforeEach
    public void setUp() {
        service = new CarbonCalculationService();
    }

    @Test
    public void testCalculateEmissionsTransportation() {
        // 100 km * 0.17 kg CO2/km = 17.0 kg CO2
        double result = service.calculateEmissions(Category.TRANSPORTATION, 100);
        assertEquals(17.0, result, 0.0001);
    }

    @Test
    public void testCalculateEmissionsEnergy() {
        // 50 kWh * 0.45 kg CO2/kWh = 22.5 kg CO2
        double result = service.calculateEmissions(Category.ENERGY, 50);
        assertEquals(22.5, result, 0.0001);
    }

    @Test
    public void testCalculateEmissionsDiet() {
        // 3 meals * 2.5 kg CO2/meal = 7.5 kg CO2
        double result = service.calculateEmissions(Category.DIET, 3);
        assertEquals(7.5, result, 0.0001);
    }

    @Test
    public void testCalculateEmissionsZeroValue() {
        // 0 input should return 0 emissions
        double result = service.calculateEmissions(Category.TRANSPORTATION, 0);
        assertEquals(0.0, result, 0.0001);
    }

    @Test
    public void testCalculateEmissionsNegativeValueThrowsException() {
        // Negative input should throw exception
        assertThrows(IllegalArgumentException.class, () -> {
            service.calculateEmissions(Category.ENERGY, -10);
        });
    }

    @Test
    public void testCalculateEmissionsNullCategoryThrowsException() {
        // Null category should throw exception (due to switch statement)
        assertThrows(NullPointerException.class, () -> {
            service.calculateEmissions(null, 10);
        });
    }
}
