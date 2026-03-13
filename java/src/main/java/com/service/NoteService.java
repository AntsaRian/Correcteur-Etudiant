package com.service;

import com.entity.Note;
import com.entity.Parametre;
import com.repository.NoteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private ParametreService parametreService;

    @Autowired
    private ResolutionService resolutionService;

    public Integer create(Note m) {
        Note saved = noteRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!noteRepository.existsById(id)) return false;
        noteRepository.deleteById(id);
        return true;
    }

    public boolean update(Note m) {
        if (!noteRepository.existsById(m.getId())) return false;
        noteRepository.save(m);
        return true;
    }

    public List<Note> getAll() {
        return noteRepository.findAll();
    }

    public Optional<Note> getById(Integer id) {
        return noteRepository.findById(id);
    }

    // public — utilisées par le controller
    public List<Note> get_notes_by_id_etu(Integer id) {
        return noteRepository.get_notes_by_id_etu(id);
    }

    public List<Note> get_notes_by_etu_matiere(Integer idetu, Integer idmatiere) {
        return noteRepository.get_notes_by_etu_matiere(idetu, idmatiere);
    }

    public List<Double> get_notes_matiere(Integer idmatiere, Integer idetu) {
        return noteRepository.get_notes_matiere(idmatiere, idetu);
    }

    // my fonctions
    // get note by id etu
    public List<Note> get_notes_etu (int id_etudiant) {
        return noteRepository.get_notes_by_id_etu(id_etudiant);
    }

    // get note by id etu & id matiere
    public List<Note> get_notes_etu_matiere (int id_etudiant, int id_matiere) {
        return noteRepository.get_notes_by_etu_matiere(id_etudiant, id_matiere);
    }

    // get notes matiere
    public List<Double> get_notes_matiere_etudiant(int id_matiere, int id_etudiant) {
        return noteRepository.get_notes_matiere(id_matiere, id_etudiant);
    }

    // get all diff by notes
    public List<Double> get_all_diff_notes(List<Double> notes) {
        if (notes.size() == 1) {
            List<Double> diff = new ArrayList<>();
            diff.add(0.0);
            return diff;
        }

        List<Double> diff = new ArrayList<>();

        for (int i = 0; i < notes.size() - 1; i++) {
            for (int j = i + 1; j < notes.size(); j++) {
                double differrence = Math.abs(notes.get(i) - notes.get(j));
                diff.add(differrence);
            }
        }

        return diff;
    }

    // note finale etu par matiere
    public double note_final_matiere(int id_etudiant, int id_matiere) {
        List<Double> notes_etu = get_notes_matiere_etudiant(id_matiere, id_etudiant);
        List<Double> all_diff = get_all_diff_notes(notes_etu);
        double diff_matiere = resolutionService.somme(all_diff);
        List<Parametre> parametres = parametreService.get_param_matiere(id_matiere);

        // verification
        if (notes_etu.size() == 1) {
            return notes_etu.get(0);
        }

        if (diff_matiere == 0) {
            return notes_etu.get(0);
        }

        String resolution = resolutionService.get_resolution(parametres, diff_matiere);

        // note finale
        return resolutionService.find_resolution(notes_etu, resolution);
    }
}
