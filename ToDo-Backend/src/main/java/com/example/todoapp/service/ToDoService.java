package com.example.todoapp.service;

import com.example.todoapp.model.ToDo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ToDoService {

    private final List<ToDo> todo = new ArrayList<>();

    public ToDoService() {
//        todo.add(new ToDo(1, "Learn Spring Boot", false));
//        todo.add(new ToDo(2, "Finish ToDo App", false));
//        todo.add(new ToDo(3, "Review Java Basics", true));
    }

    public String getToDo() {
        return "ToDo App";
    }

    public List<ToDo> getAllTasks() {
        return todo;
    }

    public String addTask(ToDo task) {
        todo.add(task);
        return "task added";
    }

    public String deleteTask(int id) {
        boolean deleted = todo.removeIf(task -> task.getId() == id);
        return deleted ? "task deleted" : "task not found";
    }

    public String updateTask(int id) {
        for (ToDo task : todo) {
            if (task.getId() == id) {
                task.setIsDone(!task.getIsDone());
            }
        }
        return "task updated";
    }
}
