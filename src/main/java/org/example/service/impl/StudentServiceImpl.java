package org.example.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.dto.Student;
import org.example.repository.NativeStudentRepository;
import org.example.repository.StudentRepository;
import org.example.service.StudentService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class StudentServiceImpl implements StudentService {

    final StudentRepository repository;
    final NativeStudentRepository nativeStudentRepository;

    @Override
    public Map getStudent() {
        List<Student> listOfStudents = repository.findAll();
        Long studentCount = nativeStudentRepository.getRecordCount();

        Map response = new HashMap<>();
        response.put("studentList",listOfStudents);
        response.put("studentCount",studentCount);

        return response;
    }

    @Override
    public void addStudent(Student student) {
        repository.save(student);
    }

    @Override
    public void deleteStudentById(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public void updateStudent(Student student) {
        repository.save(student);
    }

    @Override
    public List<Student> findByName(String name) {
        return repository.findByName(name);
    }

    @Override
    public List<Student> findAllStudents() {
        return repository.findAll();
    }

    @Override
    public Student findStudentById(Integer id) {
        return repository.findAllById(id);
    }
}
