package com.example.breakabletoy;

import com.example.breakabletoy.model.Task;
import com.example.breakabletoy.services.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class TaskServiceTest {

    @Mock
    private List<Task> tasks;

    @InjectMocks
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        tasks = new ArrayList<>();
        taskService = new TaskService(tasks);
    }

    @Test
    void addTask() {
        Task task = new Task(1, "Test Task", false, LocalDateTime.now(), null, LocalDateTime.now(), "high");
        taskService.addTask(task);
        assertTrue(tasks.contains(task));
    }

    @Test
    void removeTask() {
        Task task = new Task(1, "Test Task", false, LocalDateTime.now(), null, LocalDateTime.now(), "high");
        tasks.add(task);
        taskService.removeTask(1);
        assertFalse(tasks.contains(task));
    }

    @Test
    void getTask() {
        Task task = new Task(1, "Test Task", false, LocalDateTime.now(), null, LocalDateTime.now(), "high");
        tasks.add(task);
        Optional<Task> foundTask = taskService.getTask(1);
        assertTrue(foundTask.isPresent());
        assertEquals(task, foundTask.get());
    }

    @Test
    void getAllTasks() {
        Task task1 = new Task(1, "Test Task 1", false, LocalDateTime.now(), null, LocalDateTime.now(), "high");
        Task task2 = new Task(2, "Test Task 2", false, LocalDateTime.now(), null, LocalDateTime.now(), "medium");
        tasks.add(task1);
        tasks.add(task2);
        List<Task> allTasks = taskService.getAllTasks();
        assertEquals(2, allTasks.size());
    }

    @Test
    void updateTask() {
        Task task = new Task(1, "Test Task", false, LocalDateTime.now(), null, LocalDateTime.now(), "high");
        tasks.add(task);
        Task updatedTask = new Task(1, "Updated Task", true, LocalDateTime.now(), LocalDateTime.now(), LocalDateTime.now(), "low");
        taskService.updateTask(updatedTask, 1);
        assertEquals("Updated Task", task.getDescription());
        assertTrue(task.getCompleted());
        assertEquals("low", task.getPriority());
    }

    @Test
    void getAverageTimeToComplete() {
        Task task1 = new Task(1, "Test Task 1", true, LocalDateTime.now(), LocalDateTime.now().plusHours(1), LocalDateTime.now(), "high");
        Task task2 = new Task(2, "Test Task 2", true, LocalDateTime.now(), LocalDateTime.now().plusHours(2), LocalDateTime.now(), "medium");
        tasks.add(task1);
        tasks.add(task2);
        double averageTime = taskService.getAverageTimeToComplete();
        assertEquals(90, averageTime);
    }

    @Test
    void toggleTask() {
        Task task = new Task(1, "Test Task", false, LocalDateTime.now(), null, LocalDateTime.now(), "high");
        tasks.add(task);
        taskService.toggleTask(task);
        assertTrue(task.getCompleted());
    }
}
