package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Matiere")
public class Matiere {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "nom", length = 50)
    private String nom;

    @Column(name = "coeff")
    private int coeff;

    // ---------- Constructeurs ----------
    public Matiere() {}

    public Matiere(Integer id, String nom, int coeff) {
        this.id = id;
        this.nom = nom;
        this.coeff = coeff;
    }

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

    public int getCoeff() {
        return coeff;
    }

    public void setCoeff(int coeff) {
        this.coeff = coeff;
    }

}
