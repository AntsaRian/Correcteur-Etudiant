package com.service;

import com.entity.Parametre;
import com.entity.Resolution;
import com.repository.ResolutionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ResolutionService {

    @Autowired
    private ResolutionRepository resolutionRepository;

    @Autowired
    private OperateurService operateurService;

    public Integer create(Resolution m) {
        Resolution saved = resolutionRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!resolutionRepository.existsById(id)) return false;
        resolutionRepository.deleteById(id);
        return true;
    }

    public boolean update(Resolution m) {
        if (!resolutionRepository.existsById(m.getId())) return false;
        resolutionRepository.save(m);  // save = update
        return true;
    }

    public List<Resolution> getAll() {
        return resolutionRepository.findAll();
    }

    public Optional<Resolution> getById(Integer id) {
        return resolutionRepository.findById(id);
    }

    // my fonctions
    // get resolution
    public String get_resolution(List<Parametre> parametre, double diff) {
        String reso = null;
        
        for (Parametre p : parametre) {
            boolean compare = operateurService.comparer(p.getOperateur().getOperateur(), diff, p.getDiff());
            if (compare) {
                reso = p.getResolution().getResolution();
                break;
            }
        }

        return reso;
    }

    // find resolution
    public double find_resolution(List<Double> notes, String reso) {
        if (reso.equalsIgnoreCase("plus petit")) {
            return resolution_plus_petit(notes);
        } else if (reso.equalsIgnoreCase("plus grand")) {
            return resolution_plus_grand(notes);
        } else if (reso.equalsIgnoreCase("moyenne")) {
            return resolution_moyenne(notes);
        }

        return 0.0;
    }

    // somme 
    public double somme(List<Double> diff) {
        double somme = 0;

        for (Double d : diff) {
            somme += d;
        }

        return somme;
    }

    // resolution plus grand
    public double resolution_plus_petit(List<Double> notes) {
        Collections.sort(notes);

        return notes.get(0);
    }

    // resolution plus petit
    public double resolution_plus_grand(List<Double> notes) {
        Collections.sort(notes, Collections.reverseOrder());

        return notes.get(0);
    }

    // resolution moyenne
    public double resolution_moyenne(List<Double> notes) {
        return somme(notes) / notes.size();
    }
}
