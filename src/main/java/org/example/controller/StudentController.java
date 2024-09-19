package org.example.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.Student;
import org.example.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:5500")
@RequiredArgsConstructor
@Slf4j
public class StudentController {

    final StudentService service;

    @GetMapping("/get-student")
    public List<Student> getAllStudents() {
        return service.findAllStudents();
    }

    @GetMapping("/get-Student/find-by-name/{name}")
    public List<Student> getStudentByName(@PathVariable String name) {
        return service.findByName(name);
    }

    @PostMapping("/add-student")
    public void addStudent(@RequestBody Student student, HttpServletRequest request)  {
        String os = request.getHeader("sec-ch-ua");

        log.info("Request Received  {} {}",student,os);
        service.addStudent(student);
    }

    @DeleteMapping("/delete-student/{id}")
    public void deleteStudentById(@PathVariable Integer id) {
        service.deleteStudentById(id);
    }

    @PutMapping("/update-student")
    public void updateStudent(@RequestBody Student student) {
        service.updateStudent(student);
    }
}