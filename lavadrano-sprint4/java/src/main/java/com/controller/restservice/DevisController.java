package com.controller.restservice;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Devis;
import com.service.DevisService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class DevisController {

    @Autowired
    private DevisService devisService;

    @GetMapping("/devis")
    public List<Devis> getAll() {
        return devisService.getAll();
    }

    @GetMapping("/devis/{id}")
    public ResponseEntity<Devis> getById(@PathVariable Integer id) {
        Optional<Devis> n = devisService.getById(id);
        return n.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/devis")
    public ResponseEntity<Integer> create(@RequestBody Devis devis) throws Exception {
        Integer id = devisService.create(devis);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/devis/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody Devis devis) {
        devis.setId(id);
        boolean updated = devisService.update(devis);
        if (!updated) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping("/devis/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        boolean deleted = devisService.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Deleted");
    }
}