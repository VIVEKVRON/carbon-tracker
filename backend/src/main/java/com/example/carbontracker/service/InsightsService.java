package com.example.carbontracker.service;

import com.example.carbontracker.model.CarbonLog;
import com.example.carbontracker.model.Category;
import com.example.carbontracker.repository.CarbonLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

/**
 * Service responsible for analyzing user carbon logs and generating personalized reduction insights.
 */
@Service
@RequiredArgsConstructor
public class InsightsService {

    private final CarbonLogRepository carbonLogRepository;

    public List<String> getPersonalizedInsights(UUID userId) {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        List<CarbonLog> logs = carbonLogRepository.findByUserIdAndLoggedAtAfter(userId, sevenDaysAgo);

        if (logs.size() < 3) {
            return List.of("Log a few more activities to unlock personalized reduction insights!");
        }

        double totalEmissions = 0;
        Map<Category, Double> emissionsByCategory = new HashMap<>();

        for (CarbonLog log : logs) {
            double emission = log.getCo2EmissionsKg() != null ? log.getCo2EmissionsKg() : 0.0;
            totalEmissions += emission;
            emissionsByCategory.put(log.getCategory(), emissionsByCategory.getOrDefault(log.getCategory(), 0.0) + emission);
        }

        if (totalEmissions <= 0) {
            return List.of("Great job! Your carbon footprint for the last 7 days is essentially zero.");
        }

        Category highestCategory = null;
        double highestEmission = -1;

        for (Map.Entry<Category, Double> entry : emissionsByCategory.entrySet()) {
            if (entry.getValue() > highestEmission) {
                highestEmission = entry.getValue();
                highestCategory = entry.getKey();
            }
        }

        int percentage = (int) Math.round((highestEmission / totalEmissions) * 100);

        String insight;
        if (highestCategory == Category.TRANSPORTATION) {
            insight = "Transport accounts for " + percentage + "% of your footprint this week. Consider carpooling or public transit to cut this by 20%.";
        } else if (highestCategory == Category.ENERGY) {
            insight = "Energy accounts for " + percentage + "% of your footprint this week. Consider adjusting your thermostat or switching to LED bulbs.";
        } else if (highestCategory == Category.DIET) {
            insight = "Diet accounts for " + percentage + "% of your footprint this week. Consider substituting one meat-based meal with a plant-based alternative.";
        } else {
            insight = "Keep tracking your activities to see more insights!";
        }

        return List.of(insight);
    }
}
