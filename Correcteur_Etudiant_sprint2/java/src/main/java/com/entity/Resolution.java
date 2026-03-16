package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Resolution")
public class Resolution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "resolution", nullable = false, length = 50)
    private String resolution;

    // ---------- Constructeurs ----------
    public Resolution() {}

    public Resolution(Integer id, String resolution) {
        this.id = id;
        this.resolution = resolution;
    }

    // ---------- Getters & Setters ----------
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String nom) {
        this.resolution = nom;
    }
}
