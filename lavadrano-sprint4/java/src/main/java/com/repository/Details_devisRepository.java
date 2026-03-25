package com.repository;

import com.entity.Details_devis;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface Details_devisRepository extends JpaRepository<Details_devis, Integer> {

}
