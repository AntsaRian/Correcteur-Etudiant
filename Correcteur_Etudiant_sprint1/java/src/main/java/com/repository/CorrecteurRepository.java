package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Correcteur;

import java.util.List;

@Repository
public interface CorrecteurRepository extends JpaRepository<Correcteur, Integer> {
    
}
