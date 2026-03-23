package com.controller.restservice;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Type_devis;
import com.service.TypeDevisService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class TypeDevisController {

    @Autowired
    private TypeDevisService typeDevisService;

    @GetMapping("/type-devis")
    public List<Type_devis> getAll() {
        return typeDevisService.getAll();
    }

    @GetMapping("/type-devis/{id}")
    public ResponseEntity<Type_devis> getById(@PathVariable Integer id) {
        Optional<Type_devis> n = typeDevisService.getById(id);
        return n.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/type-devis")
    public ResponseEntity<Integer> create(@RequestBody Type_devis typeDevis) {
        Integer id = typeDevisService.create(typeDevis);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/type-devis/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody Type_devis typeDevis) {
        typeDevis.setId(id);
        boolean updated = typeDevisService.update(typeDevis);
        if (!updated) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping("/type-devis/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        boolean deleted = typeDevisService.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Deleted");
    }
}