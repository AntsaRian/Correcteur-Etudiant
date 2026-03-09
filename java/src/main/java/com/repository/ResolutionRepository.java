package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Resolution;

import java.util.List;

@Repository
public interface ResolutionRepository extends JpaRepository<Resolution, Integer> {
    
}
