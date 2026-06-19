package com.example.carbontracker.repository;

import com.example.carbontracker.model.UserChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserChallengeRepository extends JpaRepository<UserChallenge, UUID> {
    @Query("SELECT uc FROM UserChallenge uc JOIN FETCH uc.challenge WHERE uc.user.id = :userId")
    List<UserChallenge> findByUserIdWithChallenges(@Param("userId") UUID userId);

    Optional<UserChallenge> findByUserIdAndChallengeId(UUID userId, UUID challengeId);
}
