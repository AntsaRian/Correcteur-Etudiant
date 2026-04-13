package com.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "Demande")
public class Demande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "id_client", nullable = false)
    private Client client;

    @Column(name = "lieu", nullable = false, length = 50)
    private String lieu;

    @Column(name = "district", nullable = false, length = 50)
    private String district;

    @JsonIgnore
    @OneToMany(mappedBy = "demande")
    private List<Demande_statut> demande_statuts;

    // ---------- Constructeurs ----------
    public Demande() {}

    public Demande(Integer id, Client client, String lieu, String district) {
        this.id = id;
        this.client = client;
        this.lieu = lieu;
        this.district = district;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }
}
