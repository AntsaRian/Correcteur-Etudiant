package com.entity;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "Demande_statut")
public class Demande_statut {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_demande", nullable = false)
    private Demande demande;

    @ManyToOne
    @JoinColumn(name = "id_statut", nullable = false)
    private Statuts statuts;

    @Column(name = "daty", nullable = false)
    private Date daty;

    public Demande_statut () {}

    public Demande_statut(Integer id, Demande demande, Statuts statuts, Date daty) {
        this.id = id;
        this.demande = demande;
        this.statuts = statuts;
        this.daty = daty;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Demande getDemande() {
        return demande;
    }

    public void setDemande(Demande demande) {
        this.demande = demande;
    }

    public Statuts getStatuts() {
        return statuts;
    }

    public void setStatuts(Statuts statuts) {
        this.statuts = statuts;
    }

    public Date getDaty() {
        return daty;
    }

    public void setDaty(Date daty) {
        this.daty = daty;
    }
}
