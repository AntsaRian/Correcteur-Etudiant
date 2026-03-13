package com.service;

import com.entity.Matiere;
import com.repository.MatiereRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MatiereService {

    @Autowired
    private MatiereRepository deptRepository;

    public Integer create(Matiere m) {
        Matiere saved = deptRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!deptRepository.existsById(id)) return false;
        deptRepository.deleteById(id);
        return true;
    }

    public boolean update(Matiere m) {
        if (!deptRepository.existsById(m.getId())) return false;
        deptRepository.save(m);  // save = update
        return true;
    }

    public List<Matiere> getAll() {
        return deptRepository.findAll();
    }

    public Optional<Matiere> getById(Integer id) {
        return deptRepository.findById(id);
    }
}
