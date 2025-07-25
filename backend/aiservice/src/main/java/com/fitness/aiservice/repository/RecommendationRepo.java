package com.fitness.aiservice.repository;

import com.fitness.aiservice.entity.Recommendation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecommendationRepo extends MongoRepository<Recommendation,String> {
    List<Recommendation> findAllByUserId(String userId);

    Optional<Recommendation> findAllByActivityId(String userId);
}
