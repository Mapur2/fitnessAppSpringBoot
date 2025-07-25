package com.fitness.aiservice.service;

import com.fitness.aiservice.entity.Activity;
import com.fitness.aiservice.entity.Recommendation;
import com.fitness.aiservice.repository.RecommendationRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ActivityMessageListener {
    @Autowired
    private ActivityAiService activityAiService;
    @Autowired
    private RecommendationRepo recommendationRepo;
    @RabbitListener(queues = "activity.queue")
    public void processActivity(Activity activity){
        log.info("Recieved activity: "+activity.getId());
        Recommendation r = activityAiService.generateRecommendation(activity);
        recommendationRepo.save(r);
    }
}
