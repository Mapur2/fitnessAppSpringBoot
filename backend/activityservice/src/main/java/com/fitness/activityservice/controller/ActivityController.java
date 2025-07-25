package com.fitness.activityservice.controller;

import com.fitness.activityservice.dto.ActivityRequest;
import com.fitness.activityservice.dto.ActivityResponse;
import com.fitness.activityservice.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/activities")
@RestController
public class ActivityController {
    @Autowired
    private ActivityService activityService;
    //Create a activity
    @PostMapping
    public ResponseEntity<ActivityResponse> trackActivity(@RequestBody ActivityRequest request, @RequestHeader("Authorization") String token){
        System.out.println(token);
        return ResponseEntity.ok(activityService.trackActivity(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActivityResponse> getActivityById(@PathVariable String id){
        return ResponseEntity.ok(activityService.getActivityById(id));
    }
    @GetMapping
    public ResponseEntity<List<ActivityResponse>> getUserActivities(@RequestHeader("X-User-ID") String userId){
        return ResponseEntity.ok(activityService.getUserActivities(userId));
    }
}
