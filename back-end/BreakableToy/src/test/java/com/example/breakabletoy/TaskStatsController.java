package com.example.breakabletoy;

import com.example.breakabletoy.controller.TaskStatsController;
import com.example.breakabletoy.services.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskStatsControllerTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskStatsController taskStatsController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAverageTime() {
        when(taskService.getAverageTimeToComplete()).thenReturn(90.0);
        ResponseEntity<Double> response = taskStatsController.getAverageTime();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(90.0, response.getBody());
    }

    @Test
    void getAverageTimeWithPriority() {
        when(taskService.getAverageTimeToCompleteFiltered("high")).thenReturn(60.0);
        ResponseEntity<Double> response = taskStatsController.getAverageTimeWithPriority("high");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(60.0, response.getBody());
    }

    @Test
    void getTotalTaskCount() {
        when(taskService.getTotalTaskCount()).thenReturn(10L);
        ResponseEntity<Long> response = taskStatsController.getTotalTaskCount();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(10L, response.getBody());
    }

    @Test
    void getCompletedTaskCount() {
        when(taskService.getCompletedTaskCount()).thenReturn(5L);
        ResponseEntity<Long> response = taskStatsController.getCompletedTaskCount();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(5L, response.getBody());
    }

    @Test
    void getTaskCountByPriority() {
        when(taskService.getTaskCount("high", null, null)).thenReturn(3L);
        ResponseEntity<Long> response = taskStatsController.getTaskCountByPriority("high");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(3L, response.getBody());
    }

    @Test
    void getTaskCountByDate() {
        when(taskService.getTaskCount(null, "2023-12-31", null)).thenReturn(2L);
        ResponseEntity<Long> response = taskStatsController.getTaskCountByDate("2023-12-31");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2L, response.getBody());
    }

    @Test
    void getTaskCount() {
        when(taskService.getTaskCount("high", "2023-12-31", "completed")).thenReturn(1L);
        ResponseEntity<Long> response = taskStatsController.getTaskCount("high", "2023-12-31", "completed");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1L, response.getBody());
    }
}
