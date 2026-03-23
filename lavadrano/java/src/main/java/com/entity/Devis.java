package com.entity;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "Devis")
public class Devis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "note", nullable = false)
    private double note;

    @ManyToOne
    @JoinColumn(name = "id_type_devis", nullable = false)
    private Type_devis type_devis;

    @Column(name = "daty", nullable = false)
    private Date daty;

    @ManyToOne
    @JoinColumn(name = "id_demande", nullable = false)
    private Demande demande;

    public Devis () {}

    public Devis(Integer id, double note, Type_devis type_devis, Date daty, Demande demande) {
        this.id = id;
        this.note = note;
        this.type_devis = type_devis;
        this.daty = daty;
        this.demande = demande;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public double getNote() {
        return note;
    }

    public void setNote(double note) {
        this.note = note;
    }

    public Type_devis getType_devis() {
        return type_devis;
    }

    public void setType_devis(Type_devis type_devis) {
        this.type_devis = type_devis;
    }

    public Date getDaty() {
        return daty;
    }

    public void setDaty(Date daty) {
        this.daty = daty;
    }

    public Demande getDemande() {
        return demande;
    }

    public void setDemande(Demande demande) {
        this.demande = demande;
    }
}
