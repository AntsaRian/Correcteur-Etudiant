package com.service;

import com.entity.Devis;
import com.repository.DevisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DevisService {

    @Autowired
    private DevisRepository devisRepository;

    public Integer create(Devis m) {
        Devis saved = devisRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!devisRepository.existsById(id)) return false;
        devisRepository.deleteById(id);
        return true;
    }

    public boolean update(Devis m) {
        if (!devisRepository.existsById(m.getId())) return false;
        devisRepository.save(m);
        return true;
    }

    public List<Devis> getAll() {
        return devisRepository.findAll();
    }

    public Optional<Devis> getById(Integer id) {
        return devisRepository.findById(id);
    }
}