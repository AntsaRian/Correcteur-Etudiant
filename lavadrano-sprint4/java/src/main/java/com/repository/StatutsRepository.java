package com.repository;

import com.entity.Statuts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface StatutsRepository extends JpaRepository<Statuts, Integer> {

}
