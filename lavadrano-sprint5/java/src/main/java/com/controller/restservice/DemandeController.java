package com.controller.restservice;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Demande;
import com.service.DemandeService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class DemandeController {

    @Autowired
    private DemandeService demandeService;

    @GetMapping("/demandes")
    public List<Demande> getAll() {
        return demandeService.getAll();
    }

    @GetMapping("/demandes/{id}")
    public ResponseEntity<Demande> getById(@PathVariable Integer id) {
        Optional<Demande> n = demandeService.getById(id);

        return n.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/demandes/search")
    public List<Integer> search(@RequestParam Integer id) {
        List<Integer> list = demandeService.find_all_id_starts_with(id);
        return list;
    }

    @PostMapping("/demandes")
    public ResponseEntity<Integer> create(@RequestBody Demande demande) throws Exception {
        Integer id = demandeService.create(demande);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/demandes/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody Demande demande) {
        demande.setId(id);
        boolean updated = demandeService.update(demande);
        if (!updated) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping("/demandes/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        boolean deleted = demandeService.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Deleted");
    }
}