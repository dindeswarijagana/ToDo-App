package com.example.todoapp.controller;

import com.example.todoapp.model.ToDo;
import com.example.todoapp.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping
public class ToDoController {
    @Autowired
    private ToDoService todoService;


//    @GetMapping("/")
//    public String getToDo() {
//        return todoService.getToDo();
//    }

    @GetMapping("/alltasks")
    public List<ToDo> getAllTasks() {
        return todoService.getAllTasks();
    }

    @PostMapping("/ToDo/addtask")
    public String addTask(@RequestBody ToDo task) {
        return todoService.addTask(task);
    }
//
    @DeleteMapping("/ToDo/deletetask/{id}")
    public String deleteTask(@PathVariable int id) {
        return todoService.deleteTask(id);
    }
//
    @PutMapping("/ToDo/updatetask/{id}")
    public String updateTask(@PathVariable int id) {
        return todoService.updateTask(id);
    }
}
