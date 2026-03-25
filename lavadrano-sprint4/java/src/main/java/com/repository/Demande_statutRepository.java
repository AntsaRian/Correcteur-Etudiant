package com.repository;

import com.entity.Demande_statut;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface Demande_statutRepository extends JpaRepository<Demande_statut, Integer> {

}
