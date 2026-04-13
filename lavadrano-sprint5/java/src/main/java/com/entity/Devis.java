package com.entity;

import jakarta.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "Devis")
public class Devis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_type_devis", nullable = false)
    private Type_devis type_devis;

    @Column(name = "daty", nullable = false)
    private Date daty;

    @ManyToOne
    @JoinColumn(name = "id_demande", nullable = false)
    private Demande demande;

    @OneToMany(mappedBy = "devis", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Details_devis> detail_devis;

    public Devis () {}

    public Devis(Integer id, Type_devis type_devis, Date daty, Demande demande) {
        this.id = id;
        this.type_devis = type_devis;
        this.daty = daty;
        this.demande = demande;
    }

    public Devis(Type_devis type_devis, Date daty, Demande demande) {
        this.type_devis = type_devis;
        this.daty = daty;
        this.demande = demande;
    }

    public Devis(Type_devis type_devis, Date daty, Demande demande, List<Details_devis> detail_devis) {
        this.type_devis = type_devis;
        this.daty = daty;
        this.demande = demande;
        this.detail_devis = detail_devis;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public List<Details_devis> getDetail_devis() {
        return detail_devis;
    }

    public void setDetail_devis(List<Details_devis> detail_devis) {
        this.detail_devis = detail_devis;
    }
}
