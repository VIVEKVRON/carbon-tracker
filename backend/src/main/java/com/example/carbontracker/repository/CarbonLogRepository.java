package com.example.carbontracker.repository;

import com.example.carbontracker.model.CarbonLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface CarbonLogRepository extends JpaRepository<CarbonLog, UUID> {
    List<CarbonLog> findByUserIdOrderByLoggedAtDesc(UUID userId);
    List<CarbonLog> findByUserIdAndLoggedAtAfter(UUID userId, LocalDateTime startDate);

    @Query("SELECT new com.example.carbontracker.dto.CategoryEmissionDto(c.category, SUM(c.co2EmissionsKg)) " +
           "FROM CarbonLog c " +
           "WHERE c.userId = :userId AND c.loggedAt >= :startDate " +
           "GROUP BY c.category")
    List<com.example.carbontracker.dto.CategoryEmissionDto> findEmissionsByCategoryAndDateAfter(
            @Param("userId") UUID userId, 
            @Param("startDate") LocalDateTime startDate);
            
    @Query("SELECT SUM(c.co2EmissionsKg) FROM CarbonLog c " +
           "WHERE c.userId = :userId AND c.loggedAt >= :startDate")
    Double findTotalEmissionsByDateAfter(@Param("userId") UUID userId, @Param("startDate") LocalDateTime startDate);
}
