package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Remise")
public class Remise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "pourcentage")
    private int pourcentage;

    @Column(name = "valeur")
    private double valeur;

    public Remise(Integer id, int pourcentage, double valeur) {
        this.id = id;
        this.pourcentage = pourcentage;
        this.valeur = valeur;
    }

    public Remise () {}

    public Remise(int pourcentage, double valeur) {
        this.pourcentage = pourcentage;
        this.valeur = valeur;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getPourcentage() {
        return pourcentage;
    }

    public void setPourcentage(int pourcentage) {
        this.pourcentage = pourcentage;
    }

    public double getValeur() {
        return valeur;
    }

    public void setValeur(double valeur) {
        this.valeur = valeur;
    }
}
