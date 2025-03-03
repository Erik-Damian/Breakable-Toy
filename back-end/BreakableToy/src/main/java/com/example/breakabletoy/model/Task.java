package com.example.breakabletoy.model;

import java.time.LocalDateTime;

public class Task {

    private int id;
    private String description;
    private boolean completed;
    private LocalDateTime dueDate;
    private LocalDateTime finishDate;
    private LocalDateTime createdDate;
    private String priority;

    // Default constructor
    public Task() {
    }

    // Complete constructor
    public Task(int id, String description, boolean completed, LocalDateTime dueDate, LocalDateTime finishDate, LocalDateTime createdDate, String priority) {
        this.id = id;
        this.description = description;
        this.completed = completed;
        this.dueDate = dueDate;
        this.finishDate = finishDate;
        this.createdDate = createdDate;
        this.priority = priority;
    }

    // Getters and Setters

    // Get the ID of the task
    public int getId() {
        return this.id;
    }

    // Set the ID of the task
    public void setId(int id) {
        this.id = id;
    }

    // Get the description of the task
    public String getDescription() {
        return this.description;
    }

    // Set the description of the task
    public void setDescription(String description) {
        this.description = description;
    }

    // Get the completion status of the task
    public boolean getCompleted() {
        return this.completed;
    }

    // Set the completion status of the task
    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    // Get the due date of the task
    public LocalDateTime getDueDate() {
        return this.dueDate;
    }

    // Set the due date of the task
    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    // Get the finish date of the task
    public LocalDateTime getFinishDate() {
        return this.finishDate;
    }

    // Set the finish date of the task
    public void setFinishDate(LocalDateTime finishDate) {
        this.finishDate = finishDate;
    }

    // Get the created date of the task
    public LocalDateTime getCreatedDate() {
        return this.createdDate;
    }

    // Set the created date of the task
    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    // Get the priority of the task
    public String getPriority() {
        return this.priority;
    }

    // Set the priority of the task
    public void setPriority(String priority) {
        this.priority = priority;
    }

    // Toggle the completion status of the task
    public void toggleCompleted() {
        this.completed = !this.completed;
    }

    // Calculate the time to complete the task in minutes
    public long getTimeToComplete() {
        if (this.getCompleted() && this.getCreatedDate() != null && this.getFinishDate() != null) {
            return java.time.Duration.between(this.getCreatedDate(), this.getFinishDate()).toMinutes();
        } else {
            return -1;
        }
    }
}