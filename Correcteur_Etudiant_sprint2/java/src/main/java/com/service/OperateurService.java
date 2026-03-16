package com.service;

import com.entity.Operateur;
import com.repository.OperateurRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OperateurService {

    @Autowired
    private OperateurRepository operateurRepository;

    public Integer create(Operateur m) {
        Operateur saved = operateurRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!operateurRepository.existsById(id)) return false;
        operateurRepository.deleteById(id);
        return true;
    }

    public boolean update(Operateur m) {
        if (!operateurRepository.existsById(m.getId())) return false;
        operateurRepository.save(m);  // save = update
        return true;
    }

    public List<Operateur> getAll() {
        return operateurRepository.findAll();
    }

    public Optional<Operateur> getById(Integer id) {
        return operateurRepository.findById(id);
    }

    // my fonctions
    // caster operateur
    public boolean comparer(String operateur_base, double a, double b) {
       switch (operateur_base) {
        case "<":
            return a < b;
        case ">":
            return a > b;
        case "==":
            return a == b;
        case "<=":
            return a <= b;
        case ">=":
            return a >= b;  
        default:
            throw new IllegalArgumentException("Operateur invalide: " + operateur_base);
       }
    }
}
