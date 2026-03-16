package com.service;

import com.entity.Etudiant;
import com.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EtudiantService {

    @Autowired
    private EtudiantRepository etudiantRepository;

    public Integer create(Etudiant m) {
        Etudiant saved = etudiantRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!etudiantRepository.existsById(id)) return false;
        etudiantRepository.deleteById(id);
        return true;
    }

    public boolean update(Etudiant m) {
        if (!etudiantRepository.existsById(m.getId())) return false;
        etudiantRepository.save(m);  // save = update
        return true;
    }

    public List<Etudiant> getAll() {
        return etudiantRepository.findAll();
    }

    public Optional<Etudiant> getById(Integer id) {
        return etudiantRepository.findById(id);
    }
}
