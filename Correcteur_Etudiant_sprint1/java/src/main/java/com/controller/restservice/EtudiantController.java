package com.controller.restservice;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Etudiant;
import com.service.EtudiantService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class EtudiantController {

    @Autowired
    private EtudiantService etudiantService;

    @GetMapping("/etudiants")
    public List<Etudiant> getAll() {
        return etudiantService.getAll();
    }

    @GetMapping("/etudiants/{id}")
    public ResponseEntity<Etudiant> getById(@PathVariable Integer id) {
        Optional<Etudiant> e = etudiantService.getById(id);
        return e.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/etudiants")
    public ResponseEntity<Integer> create(@RequestBody Etudiant etudiant) {
        Integer id = etudiantService.create(etudiant);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/etudiants/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody Etudiant etudiant) {
        etudiant.setId(id);
        boolean updated = etudiantService.update(etudiant);
        if (!updated) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping("/etudiants/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        boolean deleted = etudiantService.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Deleted");
    }
}