package com.example.carbontracker.repository;

import com.example.carbontracker.model.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ChallengeRepository extends JpaRepository<Challenge, UUID> {
}
