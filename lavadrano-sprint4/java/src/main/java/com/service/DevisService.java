package com.service;

import com.entity.Demande_statut;
import com.entity.Details_devis;
import com.entity.Devis;
import com.entity.Statuts;
import com.repository.DevisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class DevisService {

    @Autowired
    private DevisRepository devisRepository;

    @Autowired
    private StatutsService statutsService;

    @Autowired
    private DemandeStatutService demandeStatutService;

    @Transactional
    public Integer create(Devis devis) throws Exception {
        // Lier hoe ty details ty -> ty ny devis (id_devis dans Details_devis)
        if (devis.getDetail_devis() != null) {
            for (Details_devis d : devis.getDetail_devis()) {
                d.setDevis(devis);
            }
        }

        System.out.println("Details_devis: "+devis.getDetail_devis().get(0).getLibelle());

        // Lier automatiquement par cascade = CascadeType.ALL ao am Entity Devis
        Devis saved = devisRepository.save(devis);

        // creer demande statut
        Statuts s = saved.getType_devis().getId() == 1 ? statutsService.getAll().get(1) : 
        saved.getType_devis().getId() == 2 ? statutsService.getAll().get(2) : 
        statutsService.getAll().get(0);
        
        Demande_statut ds = new Demande_statut(saved.getDemande(), s);
        demandeStatutService.create(ds);

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

    public List<Devis> getAll() throws Exception {
        try {
            return devisRepository.findAll();
        } catch (Exception e) {
            throw e;
        }
    }

    public Optional<Devis> getById(Integer id) {
        return devisRepository.findById(id);
    }

    // get all with status
    public List<Map<String, Object>> getAll_avec_statut() {
        List<Object[]> rows = devisRepository.getAll_avec_statut();

        List<Map<String, Object>> result = new ArrayList<>();
        Set<Integer> dejaAjoutes = new HashSet<>();

        for (Object[] row : rows) {
            Devis d            = (Devis) row[0];
            Demande_statut ds  = (Demande_statut) row[1];

            if (dejaAjoutes.contains(d.getId())) continue;
            dejaAjoutes.add(d.getId());

            Map<String, Object> item = new HashMap<>();
            item.put("id",               d.getId());
            item.put("daty",             d.getDaty());
            item.put("clientNom",        d.getDemande().getClient().getNom());
            item.put("lieu",             d.getDemande().getLieu());
            item.put("typeDevisLibelle", d.getType_devis().getLibelle());
            item.put("statutLibelle",    ds.getStatuts().getLibelle());

            result.add(item);
        }

        return result;
    }
}