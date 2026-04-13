package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.entity.Remise;
import com.repository.RemiseRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RemiseService {

    @Autowired
    private RemiseRepository remiseRepository;

    public Integer create(Remise m) {
        Remise saved = remiseRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!remiseRepository.existsById(id)) return false;
        remiseRepository.deleteById(id);
        return true;
    }

    public boolean update(Remise m) {
        if (!remiseRepository.existsById(m.getId())) return false;
        remiseRepository.save(m);  // save = update
        return true;
    }

    public List<Remise> getAll() {
        return remiseRepository.findAll();
    }

    public Optional<Remise> getById(Integer id) {
        return remiseRepository.findById(id);
    }
}