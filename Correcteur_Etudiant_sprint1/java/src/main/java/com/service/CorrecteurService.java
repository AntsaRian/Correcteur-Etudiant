package com.service;

import com.entity.Correcteur;
import com.repository.CorrecteurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CorrecteurService {

    @Autowired
    private CorrecteurRepository correcteurRepository;

    public Integer create(Correcteur m) {
        Correcteur saved = correcteurRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!correcteurRepository.existsById(id)) return false;
        correcteurRepository.deleteById(id);
        return true;
    }

    public boolean update(Correcteur m) {
        if (!correcteurRepository.existsById(m.getId())) return false;
        correcteurRepository.save(m);  // save = update
        return true;
    }

    public List<Correcteur> getAll() {
        return correcteurRepository.findAll();
    }

    public Optional<Correcteur> getById(Integer id) {
        return correcteurRepository.findById(id);
    }
}
