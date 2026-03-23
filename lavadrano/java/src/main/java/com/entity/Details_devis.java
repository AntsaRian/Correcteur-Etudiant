package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Details_devis")
public class Details_devis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_devis", nullable = false)
    private Devis devis;

    @Column(name = "libelle", nullable = false, length = 50)
    private String libelle;

    @Column(name = "montant", nullable = false)
    private double montant;

    public Details_devis(Integer id, Devis devis, String libelle, double montant) {
        this.id = id;
        this.devis = devis;
        this.libelle = libelle;
        this.montant = montant;
    }

    public Details_devis () {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Devis getDevis() {
        return devis;
    }

    public void setDevis(Devis devis) {
        this.devis = devis;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public double getMontant() {
        return montant;
    }

    public void setMontant(double montant) {
        this.montant = montant;
    }
}
