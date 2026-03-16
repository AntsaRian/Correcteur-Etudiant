package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.entity.Parametre;

@Repository
public interface ParametreRepository extends JpaRepository<Parametre, Integer> {
    @Query("SELECT p FROM Parametre p WHERE p.matiere.id = :id")
    List<Parametre> get_param_matiere(@Param("id") Integer id);
}
