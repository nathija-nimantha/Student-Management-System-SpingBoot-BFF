package org.example.service;

import org.example.dto.Student;

import java.util.List;
import java.util.Map;

public interface StudentService {
    Map getStudent();
    void addStudent(Student student);
    void deleteStudentById(Integer id);
    void updateStudent(Student student);
    List<Student> findByName(String name);
    List<Student> findAllStudents();
    Student findStudentById(Integer id);
}
