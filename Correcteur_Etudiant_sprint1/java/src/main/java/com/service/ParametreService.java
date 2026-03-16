package com.service;

import com.entity.Parametre;
import com.repository.ParametreRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ParametreService {

    @Autowired
    private ParametreRepository parametreRepository;

    public Integer create(Parametre m) {
        Parametre saved = parametreRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!parametreRepository.existsById(id)) return false;
        parametreRepository.deleteById(id);
        return true;
    }

    public boolean update(Parametre m) {
        if (!parametreRepository.existsById(m.getId())) return false;
        parametreRepository.save(m);
        return true;
    }

    public List<Parametre> getAll() {
        return parametreRepository.findAll();
    }

    public Optional<Parametre> getById(Integer id) {
        return parametreRepository.findById(id);
    }

    // public maintenant
    public List<Parametre> get_param_matiere(int id_matiere) {
        return parametreRepository.get_param_matiere(id_matiere);
    }
}