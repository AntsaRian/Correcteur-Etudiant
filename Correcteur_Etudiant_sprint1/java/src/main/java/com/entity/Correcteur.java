package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Correcteur")
public class Correcteur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "nom", nullable = false, length = 50)
    private String nom;

    // ---------- Constructeurs ----------
    public Correcteur() {}

    public Correcteur(Integer id, String nom) {
        this.id = id;
        this.nom = nom;
    }

    // ---------- Getters & Setters ----------
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
}
