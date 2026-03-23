package com.service;

import com.entity.Demande;
import com.repository.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DemandeService {

    @Autowired
    private DemandeRepository demandeRepository;

    public Integer create(Demande m) {
        Demande saved = demandeRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!demandeRepository.existsById(id)) return false;
        demandeRepository.deleteById(id);
        return true;
    }

    public boolean update(Demande m) {
        if (!demandeRepository.existsById(m.getId())) return false;
        demandeRepository.save(m);
        return true;
    }

    public List<Demande> getAll() {
        return demandeRepository.findAll();
    }

    public Optional<Demande> getById(Integer id) {
        return demandeRepository.findById(id);
    }
}