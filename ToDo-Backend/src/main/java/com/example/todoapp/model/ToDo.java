package com.example.todoapp.model;

import java.util.ArrayList;
import java.util.List;

public class ToDo {
    private int id;
    private String title;
    private boolean isDone;
    private List<ToDo> subtasks;

    public ToDo() {
        this.subtasks = new ArrayList<>();

    }

    public ToDo(int id, String title, boolean isDone) {
        this.id = id;
        this.title = title;
        this.isDone = isDone;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public boolean getIsDone() {
        return isDone;
    }
    public void setIsDone(boolean isDone) {
        this.isDone = isDone;
    }


    public List<ToDo> getSubtasks() {
        return subtasks;
    }
    public void setSubtasks(List<ToDo> subtasks) {
        this.subtasks = subtasks;
    }
}
