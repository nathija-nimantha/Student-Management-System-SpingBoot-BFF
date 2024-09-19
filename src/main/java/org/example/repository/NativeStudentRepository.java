package org.example.repository;

public interface NativeStudentRepository {

    Long getRecordCount();

    Long getRecordCount(String age);
}
