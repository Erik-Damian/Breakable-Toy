package com.example.breakabletoy.model;

import java.time.LocalDateTime;
public class Task {

    private int id;

    public <Optional>Task(int i, String s, String s1, String date, String date1, boolean b, String priority) {
    }

    private String Priority;
    private String description;
    private boolean completed;
    private LocalDateTime dueDate;
    private LocalDateTime finishDate;
    private LocalDateTime createdDate;

    public int getId(){return this.id;}
    public void setId(int id){this.id = id;}
    public String getDescription(){return this.description;}
    public void setDescription(String description){this.description = description;}
    public boolean getCompleted(){return this.completed;}
    public void setCompleted(boolean completed){this.completed = completed;}
    public LocalDateTime getDueDate(){return this.dueDate;}
    public void setDueDate(LocalDateTime dueDate){this.dueDate = dueDate;}
    public LocalDateTime getFinishDate(){return this.finishDate;}
    public void setFinishDate(LocalDateTime finishDate){this.finishDate = finishDate;}
    public LocalDateTime getCreatedDate(){return this.createdDate;}
    public void setCreatedDate(LocalDateTime createdDate){this.createdDate = createdDate;}
    public void setPriority(String priority){this.Priority = priority;}
    public String getPriority(){return this.Priority;}
    public void toggleCompleted(){
        this.completed = !this.completed;
    }


    public long getTimeToComplete() {
        if (this.getCompleted() && this.getCreatedDate() != null && this.getFinishDate() != null) {
            return java.time.Duration.between(this.getCreatedDate(), this.getFinishDate()).toMinutes();
        } else {
            return -1;
        }
    }

    public Task(){
    }
}
