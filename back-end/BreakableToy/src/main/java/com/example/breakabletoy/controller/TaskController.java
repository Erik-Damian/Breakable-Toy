package com.example.breakabletoy.controller;

import com.example.breakabletoy.model.Task;
import com.example.breakabletoy.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private static final Logger logger = Logger.getLogger(TaskController.class.getName());

    @Autowired
    private TaskService taskService;

    // Create a new task
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        taskService.addTask(task);
        logger.info("Task created: " + task);
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }

    // Get all tasks
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        logger.info("Retrieved all tasks");
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    // Get a task by ID
    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTask(@PathVariable int taskId) {
        Optional<Task> task = taskService.getTask(taskId);
        if (task.isPresent()) {
            logger.info("Task retrieved with ID: " + taskId);
            return new ResponseEntity<>(task.get(), HttpStatus.OK);
        } else {
            logger.warning("Task not found with ID: " + taskId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update a task by ID
    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable int taskId, @RequestBody Task updatedTask) {
        Optional<Task> existingTask = taskService.getTask(taskId);
        if (existingTask.isPresent()) {
            taskService.updateTask(updatedTask);
            logger.info("Task updated with ID: " + taskId);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } else {
            logger.warning("Task not found with ID: " + taskId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a task by ID
    @DeleteMapping("/{taskId}")
    public ResponseEntity<HttpStatus> deleteTask(@PathVariable int taskId) {
        Optional<Task> existingTask = taskService.getTask(taskId);
        if (existingTask.isPresent()) {
            taskService.removeTask(taskId);
            logger.info("Task deleted with ID: " + taskId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            logger.warning("Task not found with ID: " + taskId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get filtered tasks by search text, due date, status, and priority
    @GetMapping("/filter")
    public ResponseEntity<List<Task>> getFilteredTasks(
            @RequestParam(required = false) String searchText,
            @RequestParam(required = false) String dueDate,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority) {
        List<Task> filteredTasks = taskService.filterTasks(searchText, dueDate, status, priority);
        return new ResponseEntity<>(filteredTasks, HttpStatus.OK);
    }

    // Toggle task completion status by ID
    @PutMapping("/toggle/{taskId}")
    public ResponseEntity<Task> toggleTask(@PathVariable int taskId) {
        Optional<Task> existingTask = taskService.getTask(taskId);
        if (existingTask.isPresent()) {
            taskService.toggleTask(existingTask.get());
            logger.info("Task toggled with ID: " + taskId);
            return new ResponseEntity<>(existingTask.get(), HttpStatus.OK);
        } else {
            logger.warning("Task not found with ID: " + taskId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}