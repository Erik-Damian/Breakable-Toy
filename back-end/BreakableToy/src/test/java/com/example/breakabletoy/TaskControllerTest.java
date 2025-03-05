package com.example.breakabletoy;

import com.example.breakabletoy.controller.TaskController;
import com.example.breakabletoy.model.Task;
import com.example.breakabletoy.services.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskControllerTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createTask() {
        Task task = new Task(1, "Test Task", false, LocalDateTime.now(), null, LocalDateTime.now(), "high");
        doNothing().when(taskService).addTask(task);
        ResponseEntity<Object> response = taskController.createTask(task);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals( task, response.getBody());
    }

    @Test
    void getAllTasks() {
        List<Task> tasks = new ArrayList<>();
        tasks.add(new Task(1, "Test Task 1", false, LocalDateTime.now(), null, LocalDateTime.now(), "high"));
        tasks.add(new Task(2, "Test Task 2", false, LocalDateTime.now(), null, LocalDateTime.now(), "medium"));
        when(taskService.getAllTasks()).thenReturn(tasks);
        ResponseEntity<List<Task>> response = taskController.getAllTasks();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tasks, response.getBody());
    }

    @Test
    void getTask() {
        Task task = new Task(1, "Test Task", false, LocalDateTime.now(), null, LocalDateTime.now(), "high");
        when(taskService.getTask(1)).thenReturn(Optional.of(task));
        ResponseEntity<Task> response = taskController.getTask(1);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(task, response.getBody());
    }

    @Test
    void updateTask() {
        Task task = new Task(1, "Test Task", false, LocalDateTime.now(), null, LocalDateTime.now(), "high");
        when(taskService.getTask(1)).thenReturn(Optional.of(task));
        doNothing().when(taskService).updateTask(task,1);
        ResponseEntity<Task> response = taskController.updateTask(1, task);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(task, response.getBody());
    }

    @Test
    void deleteTask() {
        Task task = new Task(1, "Test Task", false, LocalDateTime.now(), null, LocalDateTime.now(), "high");
        when(taskService.getTask(1)).thenReturn(Optional.of(task));
        doNothing().when(taskService).removeTask(1);
        ResponseEntity<HttpStatus> response = taskController.deleteTask(1);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void toggleTask() {
        Task task = new Task(1, "Test Task", false, LocalDateTime.now(), null, LocalDateTime.now(), "high");
        when(taskService.getTask(1)).thenReturn(Optional.of(task));
        doNothing().when(taskService).toggleTask(task);
        ResponseEntity<Task> response = taskController.toggleTask(1);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(task, response.getBody());
    }
}
