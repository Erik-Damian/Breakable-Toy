package com.example.breakabletoy.services;

import com.example.breakabletoy.model.Task;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.logging.Logger;

@Service
public class TaskService {
    private static final Logger logger = Logger.getLogger(TaskService.class.getName());
    private final List<Task> tasks;
    private int idCounter = 0;

    public TaskService(List<Task> tasks) {
        this.tasks = tasks;
    }

    // Add a new task
    public void addTask(Task task) {
        while(getTask(idCounter).isPresent()){
            idCounter++;
        }
        task.setId(idCounter);
        task.setCreatedDate(java.time.LocalDateTime.now());
        tasks.add(task);
    }

    // Remove a task by ID
    public void removeTask(int taskId) {
        boolean removed = tasks.removeIf(task -> task.getId() == taskId);
        if (removed) {
            logger.info("Task removed with ID: " + taskId);
        } else {
            logger.warning("Task not found with ID: " + taskId);
        }
    }

    // Get a task by ID
    public Optional<Task> getTask(int taskId) {
        return tasks.stream()
                .filter(task -> task.getId() == taskId)
                .findFirst();
    }

    // Get all tasks
    public List<Task> getAllTasks() {
        return tasks;
    }

    // Update an existing task
    public void updateTask(Task updatedTask) {
        getTask(updatedTask.getId()).ifPresent(existingTask -> {
            existingTask.setDescription(updatedTask.getDescription());
            existingTask.setCompleted(updatedTask.getCompleted());
            existingTask.setDueDate(updatedTask.getDueDate());
            existingTask.setFinishDate(updatedTask.getFinishDate());
            existingTask.setCreatedDate(updatedTask.getCreatedDate());
            existingTask.setPriority(updatedTask.getPriority());
            logger.info("Task updated: " + updatedTask);
        });
    }

    // Get average time to complete tasks, filtered by priority
    public double getAverageTimeToCompleteFiltered(String priority) {
        return tasks.stream()
                .filter(Task::getCompleted)
                .filter(task -> task.getPriority().equals(priority))
                .mapToDouble(Task::getTimeToComplete)
                .average()
                .orElse(Double.NaN);
    }

    // Get average time to complete tasks
    public double getAverageTimeToComplete() {
        return tasks.stream()
                .filter(Task::getCompleted)
                .mapToDouble(Task::getTimeToComplete)
                .average()
                .orElse(Double.NaN);
    }

    // Toggle the completion status of a task
    public void toggleTask(Task updatedTask) {
        getTask(updatedTask.getId()).ifPresent(existingTask -> {
            if (existingTask.getCompleted()) {
                existingTask.setFinishDate(null);
            } else {
                existingTask.setFinishDate(updatedTask.getFinishDate());
            }
            existingTask.setCompleted(!existingTask.getCompleted());
            logger.info("Task toggled: " + updatedTask);
        });
    }

     // Filter tasks based on search text, due date, status, and priority
    public List<Task> filterTasks(String searchText, String dueDate, String status, String priority) {
        return tasks.stream()
                .filter(task -> searchText == null || searchText.isEmpty() || task.getDescription().toLowerCase().contains(searchText.toLowerCase()))
                .filter(task -> dueDate == null || dueDate.isEmpty() || task.getDueDate().toString().contains(dueDate))
                .filter(task -> status == null || status.isEmpty() || task.getCompleted() == (status.equals("completed") || status.equals("incomplete")))
                .filter(task -> priority == null || priority.isEmpty() || task.getPriority().toString().contains(priority))
                .collect(Collectors.toList());
    }

    // Get total count of tasks
    public long getTotalTaskCount() {
        return tasks.size();
    }

    // Get count of completed tasks
    public long getCompletedTaskCount() {
        return tasks.stream().filter(Task::getCompleted).count();
    }

    // Get count of tasks by priority, date, and status
    public long getTaskCount(String priority, String date, String status) {
        return tasks.stream()
                .filter(task -> priority == null || task.getPriority().equals(priority))
                .filter(task -> date == null || task.getDueDate().toString().equals(date))
                .filter(task -> status == null || task.getCompleted() == true)
                .count();
    }
}