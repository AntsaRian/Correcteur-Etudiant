package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Note")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_matiere", nullable = false)
    private Matiere matiere;

    @Column(name = "note", nullable = false)
    private double note;

    @ManyToOne
    @JoinColumn(name = "id_correcteur", nullable = false)
    private Correcteur correcteur;

    @ManyToOne
    @JoinColumn(name = "id_etudiant", nullable = false)
    private Etudiant etudiant;

    public Note () {}

    public Note(Integer id, Matiere matiere, double n, Correcteur correcteur, Etudiant etudiant) {
        this.id = id;
        this.matiere = matiere;
        this.note = n;
        this.correcteur = correcteur;
        this.etudiant = etudiant;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Matiere getMatiere() {
        return matiere;
    }

    public void setMatiere(Matiere matiere) {
        this.matiere = matiere;
    }

    public Correcteur getCorrecteur() {
        return correcteur;
    }

    public void setCorrecteur(Correcteur correcteur) {
        this.correcteur = correcteur;
    }

    public Etudiant getEtudiant() {
        return etudiant;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }

    public double getNote() {
        return note;
    }

    public void setNote(double note) {
        this.note = note;
    }
}
