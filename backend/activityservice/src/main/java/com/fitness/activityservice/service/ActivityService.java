package com.fitness.activityservice.service;

import com.fitness.activityservice.dto.ActivityRequest;
import com.fitness.activityservice.dto.ActivityResponse;
import com.fitness.activityservice.entity.Activity;
import com.fitness.activityservice.repository.ActivityRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class ActivityService {
    @Autowired
    private ActivityRepo activityRepo;
    @Autowired
    private UserValidationService userValidationService;
    @Value("${rabbitmq.exchange.name}")
    private String exchange;
    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    @Autowired
    private RabbitTemplate rabbitTemplate;
    public ActivityResponse trackActivity(ActivityRequest request) {

        boolean isValidUser = userValidationService.validateUser(request.getUserId());
        if(!isValidUser)
            throw new RuntimeException("Invalid User: "+request.getUserId());

        Activity activity = Activity.builder().
                userId(request.getUserId())
                .type(request.getType())
                .duration(request.getDuration())
                .caloriesBurned(request.getCaloriesBurned())
                .startTime(request.getStartTime())
                .additionalMetrics(request.getAdditionalMetrics())
                .build();
        Activity savedActivity = activityRepo.save(activity);

        //Publish to rabbitmq for Ai processing
        try{
            rabbitTemplate.convertAndSend(exchange,routingKey,savedActivity);
        }catch (Exception e){
            log.error("Failed to publish activity to RabbitMq");
        }

        return mapToResponse(savedActivity);
    }

    private ActivityResponse mapToResponse(Activity activity){
        ActivityResponse response = new ActivityResponse();
        response.setId(activity.getId());
        response.setUserId(activity.getUserId());
        response.setType(activity.getType());
        response.setStartTime(activity.getStartTime());
        response.setDuration(activity.getDuration());
        response.setCaloriesBurned(activity.getCaloriesBurned());
        response.setAdditionalMetrics(activity.getAdditionalMetrics());
        response.setCreatedAt(activity.getCreatedAt());
        response.setUpdatedAt(activity.getUpdatedAt());
        return response;
    }

    public ActivityResponse getActivityById(String id){
        return mapToResponse(activityRepo.findById(id).orElseThrow(()->new RuntimeException("Cannot find activity")));
    }

    public List<ActivityResponse> getUserActivities(String userId) {
        List<Activity> activities = activityRepo.findAllByUserId(userId);
        List<ActivityResponse> activityResponses = new ArrayList<>();
        for (Activity a:activities){
            activityResponses.add(mapToResponse(a));
        }
        return activityResponses;
    }
}
