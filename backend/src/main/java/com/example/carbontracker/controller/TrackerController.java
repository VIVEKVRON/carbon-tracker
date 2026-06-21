package com.example.carbontracker.controller;

import com.example.carbontracker.dto.AnalyticsResponse;
import com.example.carbontracker.dto.CarbonLogRequest;
import com.example.carbontracker.dto.CategoryEmissionDto;
import com.example.carbontracker.model.CarbonLog;
import com.example.carbontracker.model.User;
import com.example.carbontracker.repository.CarbonLogRepository;
import com.example.carbontracker.repository.UserRepository;
import com.example.carbontracker.service.CarbonCalculationService;
import com.example.carbontracker.service.DataExportService;
import com.example.carbontracker.service.InsightsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * REST controller for managing carbon emission logs, analytics, and insights.
 */
@RestController
@RequestMapping("/api/v1/tracker")
@RequiredArgsConstructor
public class TrackerController {

    private final CarbonLogRepository carbonLogRepository;
    private final UserRepository userRepository;
    private final CarbonCalculationService carbonCalculationService;
    private final InsightsService insightsService;
    private final DataExportService dataExportService;

    private User getAuthenticatedUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
    }

    @PostMapping
    @CacheEvict(value = "carbonLogs", allEntries = true)
    public ResponseEntity<CarbonLog> createLog(@Valid @RequestBody CarbonLogRequest request, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        
        double co2Emissions = carbonCalculationService.calculateEmissions(request.getCategory(), request.getValue());
        
        CarbonLog log = new CarbonLog();
        log.setUserId(user.getId());
        log.setCategory(request.getCategory());
        log.setValue(request.getValue());
        log.setCo2EmissionsKg(co2Emissions);
        log.setLoggedAt(LocalDateTime.now());
        
        CarbonLog savedLog = carbonLogRepository.save(log);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLog);
    }

    @GetMapping
    @Cacheable("carbonLogs")
    public ResponseEntity<List<CarbonLog>> getUserLogs(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        List<CarbonLog> logs = carbonLogRepository.findByUserIdOrderByLoggedAtDesc(user.getId());
        return ResponseEntity.ok(logs);
    }

    @DeleteMapping("/{id}")
    @CacheEvict(value = "carbonLogs", allEntries = true)
    public ResponseEntity<Void> deleteLog(@PathVariable UUID id, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        
        CarbonLog log = carbonLogRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Log not found"));
                
        if (!log.getUserId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to delete this log");
        }
        
        carbonLogRepository.delete(log);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/analytics")
    @Cacheable("carbonLogs")
    public ResponseEntity<AnalyticsResponse> getAnalytics(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        
        List<CategoryEmissionDto> categoryEmissions = carbonLogRepository
                .findEmissionsByCategoryAndDateAfter(user.getId(), thirtyDaysAgo);
                
        Double totalEmissions = carbonLogRepository
                .findTotalEmissionsByDateAfter(user.getId(), thirtyDaysAgo);
                
        double total = totalEmissions != null ? totalEmissions : 0.0;
        
        return ResponseEntity.ok(new AnalyticsResponse(total, categoryEmissions));
    }

    @GetMapping("/insights")
    public ResponseEntity<List<String>> getInsights(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        List<String> insights = insightsService.getPersonalizedInsights(user.getId());
        return ResponseEntity.ok(insights);
    }

    @GetMapping("/export")
    public ResponseEntity<String> exportCsv(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        String csvData = dataExportService.exportCarbonLogsToCsv(user.getId());
        
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=carbon_history.csv");
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        
        return new ResponseEntity<>(csvData, headers, HttpStatus.OK);
    }
}
