package com.service;

import com.entity.Demande;
import com.entity.Demande_statut;
import com.entity.Statuts;
import com.repository.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class DemandeService {

    @Autowired
    private DemandeRepository demandeRepository;

    @Autowired
    private StatutsService statutsService;

    @Autowired
    private DemandeStatutService demandeStatutService;

    @Transactional
    public Integer create(Demande m) throws Exception {
        Demande saved = demandeRepository.save(m);

        Statuts s = statutsService.getAll().get(0);
        Demande_statut ds = new Demande_statut(saved, s);
        demandeStatutService.create(ds);

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

    // get id demande
    public List<Integer> searchById(Integer id) {
        return demandeRepository.findAll()
            .stream()
            .map(Demande::getId)
            .filter(d -> d.toString().startsWith(id.toString()))
            .collect(Collectors.toList());
    }
}