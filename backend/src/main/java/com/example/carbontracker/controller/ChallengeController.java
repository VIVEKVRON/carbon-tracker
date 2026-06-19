package com.example.carbontracker.controller;

import com.example.carbontracker.dto.ChallengeDto;
import com.example.carbontracker.dto.UserChallengeDto;
import com.example.carbontracker.model.User;
import com.example.carbontracker.repository.UserRepository;
import com.example.carbontracker.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/challenges")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;
    private final UserRepository userRepository;

    private User getAuthenticatedUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
    }

    @GetMapping
    public ResponseEntity<List<ChallengeDto>> listAll() {
        return ResponseEntity.ok(challengeService.listAllChallenges());
    }

    @GetMapping("/my-active")
    public ResponseEntity<List<UserChallengeDto>> getMyActive(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        return ResponseEntity.ok(challengeService.getActiveEnrollments(user.getId()));
    }

    @PostMapping("/{challengeId}/enroll")
    public ResponseEntity<UserChallengeDto> enroll(@PathVariable UUID challengeId, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        UserChallengeDto enrolled = challengeService.enrollUser(user.getId(), challengeId);
        return ResponseEntity.status(HttpStatus.CREATED).body(enrolled);
    }
}
