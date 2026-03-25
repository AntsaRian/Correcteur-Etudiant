package com.service;

import com.entity.Demande_statut;
import com.repository.Demande_statutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DemandeStatutService {

    @Autowired
    private Demande_statutRepository demandeStatutRepository;

    @Transactional
    public Integer create(Demande_statut m) throws Exception {
        Demande_statut saved = demandeStatutRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!demandeStatutRepository.existsById(id)) return false;
        demandeStatutRepository.deleteById(id);
        return true;
    }

    public boolean update(Demande_statut m) {
        if (!demandeStatutRepository.existsById(m.getId())) return false;
        demandeStatutRepository.save(m);
        return true;
    }

    public List<Demande_statut> getAll() {
        return demandeStatutRepository.findAll();
    }

    public Optional<Demande_statut> getById(Integer id) {
        return demandeStatutRepository.findById(id);
    }
}