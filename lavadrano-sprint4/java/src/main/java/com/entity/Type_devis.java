package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Type_devis")
public class Type_devis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "libelle", nullable = false, length = 50)
    private String libelle;

    public Type_devis () {}

    public Type_devis(Integer id, String libelle) {
        this.id = id;
        this.libelle = libelle;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }
}
