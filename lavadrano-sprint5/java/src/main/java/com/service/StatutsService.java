package com.service;

import com.entity.Statuts;
import com.repository.StatutsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StatutsService {

    @Autowired
    private StatutsRepository statutsRepository;

    public Integer create(Statuts m) {
        Statuts saved = statutsRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!statutsRepository.existsById(id)) return false;
        statutsRepository.deleteById(id);
        return true;
    }

    public boolean update(Statuts m) {
        if (!statutsRepository.existsById(m.getId())) return false;
        statutsRepository.save(m);
        return true;
    }

    public List<Statuts> getAll() {
        return statutsRepository.findAll();
    }

    public Optional<Statuts> getById(Integer id) {
        return statutsRepository.findById(id);
    }
}