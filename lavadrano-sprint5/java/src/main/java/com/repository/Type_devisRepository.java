package com.repository;

import com.entity.Type_devis;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface Type_devisRepository extends JpaRepository<Type_devis, Integer> {

}
