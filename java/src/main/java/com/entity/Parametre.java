package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Parametre")
public class Parametre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_matiere", nullable = false)
    private Matiere matiere;

    @Column(name = "diff", nullable = false)
    private double diff;

    @ManyToOne
    @JoinColumn(name = "id_operateur", nullable = false)
    private Operateur operateur;

    @ManyToOne
    @JoinColumn(name = "id_resolution", nullable = false)
    private Resolution resolution;

    public Parametre () {}

        public Parametre(Integer id, Matiere matiere, double diff, Operateur operateur, Resolution resolution) {
        this.id = id;
        this.matiere = matiere;
        this.diff = diff;
        this.operateur = operateur;
        this.resolution = resolution;
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

        public double getDiff() {
            return diff;
        }

        public void setDiff(double diff) {
            this.diff = diff;
        }

        public Operateur getOperateur() {
            return operateur;
        }

        public void setOperateur(Operateur operateur) {
            this.operateur = operateur;
        }

        public Resolution getResolution() {
            return resolution;
        }

        public void setResolution(Resolution resolution) {
            this.resolution = resolution;
        }

}
