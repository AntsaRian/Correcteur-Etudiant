package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Operateur")
public class Operateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "operateur", nullable = false, length = 50)
    private String operateur;

    // ---------- Constructeurs ----------
    public Operateur() {}

    public Operateur(Integer id, String operateur) {
        this.id = id;
        this.operateur = operateur;
    }

    // ---------- Getters & Setters ----------
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOperateur() {
        return operateur;
    }

    public void setOperateur(String nom) {
        this.operateur = nom;
    }
}
