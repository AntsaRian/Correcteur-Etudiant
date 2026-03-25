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

    @Column(name = "prix_unitaire", nullable = false)
    private double prix_unitaire;

    @Column(name = "quantite", nullable = false)
    private double quantite;

    public Details_devis(Integer id, Devis devis, String libelle, double prix_unitaire, int quantite) {
        this.id = id;
        this.devis = devis;
        this.libelle = libelle;
        this.prix_unitaire = prix_unitaire;
        this.quantite = quantite;
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

    public double getPrix_unitaire() {
        return prix_unitaire;
    }

    public void setPrix_unitaire(double prix_unitaire) {
        this.prix_unitaire = prix_unitaire;
    }

    public double getQuantite() {
        return quantite;
    }

    public void setQuantite(double quantite) {
        this.quantite = quantite;
    }
}
