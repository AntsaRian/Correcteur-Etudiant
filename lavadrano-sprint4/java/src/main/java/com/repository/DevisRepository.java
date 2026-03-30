package com.repository;

import com.entity.Devis;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DevisRepository extends JpaRepository<Devis, Integer> {
    // getAll_avec statut
    @Query("""
        SELECT d, ds 
        FROM Devis d 
        JOIN Details_devis dv ON d.id = dv.devis.id 
        JOIN Demande_statut ds ON ds.demande.id = d.demande.id
        ORDER BY ds.daty DESC
    """)
    List<Object[]> getAll_avec_statut();    
}
