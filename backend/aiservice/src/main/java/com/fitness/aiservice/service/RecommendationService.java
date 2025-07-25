package com.fitness.aiservice.service;

import com.fitness.aiservice.entity.Recommendation;
import com.fitness.aiservice.repository.RecommendationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecommendationService {
    @Autowired
    private RecommendationRepo repo;

    public List<Recommendation> getUserRecommendation(String userId) {
        return repo.findAllByUserId(userId);
    }

    public Recommendation getActivityRecommendation(String activityId) {
        return repo.findAllByActivityId(activityId).orElseThrow(()->new RuntimeException("No Recommendation found "+activityId));
    }
}
