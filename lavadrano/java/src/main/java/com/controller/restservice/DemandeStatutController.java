package com.controller.restservice;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Demande_statut;
import com.service.DemandeStatutService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class DemandeStatutController {

    @Autowired
    private DemandeStatutService demandeStatutService;

    @GetMapping("/demande-statuts")
    public List<Demande_statut> getAll() {
        return demandeStatutService.getAll();
    }

    @GetMapping("/demande-statuts/{id}")
    public ResponseEntity<Demande_statut> getById(@PathVariable Integer id) {
        Optional<Demande_statut> n = demandeStatutService.getById(id);
        return n.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/demande-statuts")
    public ResponseEntity<Integer> create(@RequestBody Demande_statut demandeStatut) throws Exception {
        Integer id = demandeStatutService.create(demandeStatut);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/demande-statuts/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody Demande_statut demandeStatut) {
        demandeStatut.setId(id);
        boolean updated = demandeStatutService.update(demandeStatut);
        if (!updated) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping("/demande-statuts/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        boolean deleted = demandeStatutService.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Deleted");
    }
}