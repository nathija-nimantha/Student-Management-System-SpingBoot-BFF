package org.example.repository;

import org.example.dto.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student,Integer> {
    List<Student> findByName(String name);

    Student findAllById(Integer id);
}
