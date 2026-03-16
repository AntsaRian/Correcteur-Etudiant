package com.controller.restservice;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Operateur;
import com.service.OperateurService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class OperateurController {

    @Autowired
    private OperateurService operateurService;

    @GetMapping("/operateurs")
    public List<Operateur> getAll() {
        return operateurService.getAll();
    }

    @GetMapping("/operateurs/{id}")
    public ResponseEntity<Operateur> getById(@PathVariable Integer id) {
        Optional<Operateur> o = operateurService.getById(id);
        return o.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/operateurs")
    public ResponseEntity<Integer> create(@RequestBody Operateur operateur) {
        Integer id = operateurService.create(operateur);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/operateurs/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody Operateur operateur) {
        operateur.setId(id);
        boolean updated = operateurService.update(operateur);
        if (!updated) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping("/operateurs/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        boolean deleted = operateurService.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Deleted");
    }
}