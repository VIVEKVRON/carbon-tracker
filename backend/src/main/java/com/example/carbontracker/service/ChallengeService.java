package com.example.carbontracker.service;

import com.example.carbontracker.dto.ChallengeDto;
import com.example.carbontracker.dto.UserChallengeDto;
import com.example.carbontracker.model.Challenge;
import com.example.carbontracker.model.User;
import com.example.carbontracker.model.UserChallenge;
import com.example.carbontracker.repository.ChallengeRepository;
import com.example.carbontracker.repository.UserChallengeRepository;
import com.example.carbontracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final UserChallengeRepository userChallengeRepository;
    private final UserRepository userRepository;

    private ChallengeDto mapToChallengeDto(Challenge c) {
        return new ChallengeDto(c.getId(), c.getTitle(), c.getDescription(), c.getTargetValue(), c.getCategory(), c.getDurationDays());
    }

    private UserChallengeDto mapToUserChallengeDto(UserChallenge uc) {
        return new UserChallengeDto(
            uc.getId(), 
            mapToChallengeDto(uc.getChallenge()), 
            uc.getStartDate(), 
            uc.getCurrentStreak(), 
            uc.getIsCompleted()
        );
    }

    public List<ChallengeDto> listAllChallenges() {
        return challengeRepository.findAll().stream()
                .map(this::mapToChallengeDto)
                .collect(Collectors.toList());
    }

    public List<UserChallengeDto> getActiveEnrollments(UUID userId) {
        return userChallengeRepository.findByUserIdWithChallenges(userId).stream()
                .map(this::mapToUserChallengeDto)
                .collect(Collectors.toList());
    }

    public UserChallengeDto enrollUser(UUID userId, UUID challengeId) {
        if (userChallengeRepository.findByUserIdAndChallengeId(userId, challengeId).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User is already enrolled in this challenge");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Challenge not found"));

        UserChallenge uc = new UserChallenge();
        uc.setUser(user);
        uc.setChallenge(challenge);
        uc.setStartDate(LocalDateTime.now());
        uc.setCurrentStreak(0);
        uc.setIsCompleted(false);

        UserChallenge saved = userChallengeRepository.save(uc);
        return mapToUserChallengeDto(saved);
    }
}
