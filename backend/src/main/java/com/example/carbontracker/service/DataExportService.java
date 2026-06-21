package com.example.carbontracker.service;

import com.example.carbontracker.model.CarbonLog;
import com.example.carbontracker.repository.CarbonLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

/**
 * Service responsible for formatting and exporting user carbon logs into CSV format.
 */
@Service
@RequiredArgsConstructor
public class DataExportService {

    private final CarbonLogRepository carbonLogRepository;

    public String exportCarbonLogsToCsv(UUID userId) {
        List<CarbonLog> logs = carbonLogRepository.findByUserIdOrderByLoggedAtDesc(userId);
        
        StringBuilder csv = new StringBuilder();
        csv.append("Date,Category,Distance/Amount,CO2 Emitted (kg)\n");
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        
        for (CarbonLog log : logs) {
            csv.append(log.getLoggedAt().format(formatter)).append(",");
            csv.append(log.getCategory().name()).append(",");
            csv.append(log.getValue()).append(",");
            csv.append(log.getCo2EmissionsKg()).append("\n");
        }
        
        return csv.toString();
    }
}
