package com.example.carbontracker.config;

import com.example.carbontracker.model.Category;
import com.example.carbontracker.model.Challenge;
import com.example.carbontracker.repository.ChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final ChallengeRepository challengeRepository;

    @Override
    public void run(String... args) throws Exception {
        if (challengeRepository.count() == 0) {
            Challenge c1 = new Challenge();
            c1.setTitle("7 Days Plant-Based");
            c1.setDescription("Substitute all meat-based meals with plant-based alternatives for a full week to significantly reduce your carbon footprint.");
            c1.setTargetValue(21.0);
            c1.setCategory(Category.DIET);
            c1.setDurationDays(7);

            Challenge c2 = new Challenge();
            c2.setTitle("Zero-Emission Commute Week");
            c2.setDescription("Bike, walk, or use public transit for your daily commute for five consecutive days.");
            c2.setTargetValue(50.0);
            c2.setCategory(Category.TRANSPORTATION);
            c2.setDurationDays(5);

            Challenge c3 = new Challenge();
            c3.setTitle("Energy Saver Weekend");
            c3.setDescription("Reduce your electricity consumption over the weekend by unplugging unused devices and adjusting your thermostat.");
            c3.setTargetValue(10.0);
            c3.setCategory(Category.ENERGY);
            c3.setDurationDays(2);

            challengeRepository.saveAll(List.of(c1, c2, c3));
            System.out.println("Seeded default challenges.");
        }
    }
}
