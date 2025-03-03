package com.example.breakabletoy.controller;

import com.example.breakabletoy.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/tasks/stats")
public class TaskStatsController {

    private static final Logger logger = Logger.getLogger(TaskStatsController.class.getName());

    @Autowired
    private TaskService taskService;

    // Get average time to complete tasks
    @GetMapping("/average")
    public ResponseEntity<Double> getAverageTime() {
        double response = taskService.getAverageTimeToComplete(null);
        logger.info("Retrieved average time to complete tasks");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Get average time to complete tasks by priority
    @GetMapping("/average/{priority}")
    public ResponseEntity<Double> getAverageTimeWithPriority(@PathVariable String priority) {
        double response = taskService.getAverageTimeToComplete(priority);
        logger.info("Retrieved average time to complete tasks with priority: " + priority);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Get total count of tasks
    @GetMapping("/count")
    public ResponseEntity<Long> getTotalTaskCount() {
        long count = taskService.getTotalTaskCount();
        logger.info("Retrieved total task count");
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    // Get count of completed tasks
    @GetMapping("/count/completed")
    public ResponseEntity<Long> getCompletedTaskCount() {
        long count = taskService.getCompletedTaskCount();
        logger.info("Retrieved completed task count");
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    // Get count of tasks by priority
    @GetMapping("/count/priority/{priority}")
    public ResponseEntity<Long> getTaskCountByPriority(@PathVariable String priority) {
        long count = taskService.getTaskCount(priority, null, null);
        logger.info("Retrieved task count with priority: " + priority);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
    
    // Get count of tasks for a specific date
    @GetMapping("/count/date/{date}")
    public ResponseEntity<Long> getTaskCountByDate(@PathVariable String date) {
        long count = taskService.getTaskCount(null, date, null);
        logger.info("Retrieved task count for date: " + date);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    // Get count of tasks by priority, date, and status
    @GetMapping("/count/filter")
    public ResponseEntity<Long> getTaskCount(
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String status) {
        long count = taskService.getTaskCount(priority, date, status);
        logger.info("Retrieved task count with filters - Priority: " + priority + ", Date: " + date + ", Status: " + status);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}
