package org.example.repository.impl;

import org.example.repository.NativeStudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collections;

@Repository
@RequiredArgsConstructor
public class NativeStudentRepositoryImpl implements NativeStudentRepository {

    final NamedParameterJdbcTemplate namedJdbcTemplate;
    final JdbcTemplate jdbcTemplate;

    public Long getRecordCount(){
        return jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM STUDENT", Long.class);
    }


    public Long getRecordCount(String age){
        return namedJdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM STUDENT WHERE AGE > :age",
                Collections.singletonMap("age",age),
                Long.class);
    }

}