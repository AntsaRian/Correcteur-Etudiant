package com.service;

import com.entity.Type_devis;
import com.repository.Type_devisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TypeDevisService {

    @Autowired
    private Type_devisRepository typeDevisRepository;

    public Integer create(Type_devis m) {
        Type_devis saved = typeDevisRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!typeDevisRepository.existsById(id)) return false;
        typeDevisRepository.deleteById(id);
        return true;
    }

    public boolean update(Type_devis m) {
        if (!typeDevisRepository.existsById(m.getId())) return false;
        typeDevisRepository.save(m);
        return true;
    }

    public List<Type_devis> getAll() {
        return typeDevisRepository.findAll();
    }

    public Optional<Type_devis> getById(Integer id) {
        return typeDevisRepository.findById(id);
    }
}