package com.controller.restservice;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Details_devis;
import com.service.DetailsDevisService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class DetailsDevisController {

    @Autowired
    private DetailsDevisService detailsDevisService;

    @GetMapping("/details-devis")
    public List<Details_devis> getAll() {
        return detailsDevisService.getAll();
    }

    @GetMapping("/details-devis/{id}")
    public ResponseEntity<Details_devis> getById(@PathVariable Integer id) {
        Optional<Details_devis> n = detailsDevisService.getById(id);
        return n.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/details-devis")
    public ResponseEntity<Integer> create(@RequestBody Details_devis detailsDevis) {
        Integer id = detailsDevisService.create(detailsDevis);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/details-devis/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody Details_devis detailsDevis) {
        detailsDevis.setId(id);
        boolean updated = detailsDevisService.update(detailsDevis);
        if (!updated) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping("/details-devis/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        boolean deleted = detailsDevisService.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Deleted");
    }
}