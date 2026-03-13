package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Operateur;

import java.util.List;

@Repository
public interface OperateurRepository extends JpaRepository<Operateur, Integer> {
    
}
