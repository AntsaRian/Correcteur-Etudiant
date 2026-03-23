package com.service;

import com.entity.Details_devis;
import com.repository.Details_devisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DetailsDevisService {

    @Autowired
    private Details_devisRepository detailsDevisRepository;

    public Integer create(Details_devis m) {
        Details_devis saved = detailsDevisRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!detailsDevisRepository.existsById(id)) return false;
        detailsDevisRepository.deleteById(id);
        return true;
    }

    public boolean update(Details_devis m) {
        if (!detailsDevisRepository.existsById(m.getId())) return false;
        detailsDevisRepository.save(m);
        return true;
    }

    public List<Details_devis> getAll() {
        return detailsDevisRepository.findAll();
    }

    public Optional<Details_devis> getById(Integer id) {
        return detailsDevisRepository.findById(id);
    }
}