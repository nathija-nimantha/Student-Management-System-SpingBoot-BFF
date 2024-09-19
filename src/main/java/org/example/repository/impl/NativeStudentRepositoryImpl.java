package org.example.repository.impl;

import org.example.repository.NativeStudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class NativeStudentRepositoryImpl implements NativeStudentRepository {

    final NamedParameterJdbcTemplate namedJdbcTemplate;
    final JdbcTemplate jdbcTemplate;

    public Long getRecordCount(){
        return jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM STUDENT", Long.class);
    }
}