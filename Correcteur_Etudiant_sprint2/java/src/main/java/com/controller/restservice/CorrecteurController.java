package com.controller.restservice;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Correcteur;
import com.service.CorrecteurService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CorrecteurController {

    @Autowired
    private CorrecteurService correcteurService;

    @GetMapping("/correcteurs")
    public List<Correcteur> getAll() {
        return correcteurService.getAll();
    }

    @GetMapping("/correcteurs/{id}")
    public ResponseEntity<Correcteur> getById(@PathVariable Integer id) {
        Optional<Correcteur> c = correcteurService.getById(id);
        return c.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/correcteurs")
    public ResponseEntity<Integer> create(@RequestBody Correcteur correcteur) {
        Integer id = correcteurService.create(correcteur);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/correcteurs/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody Correcteur correcteur) {
        correcteur.setId(id);
        boolean updated = correcteurService.update(correcteur);
        if (!updated) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping("/correcteurs/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        boolean deleted = correcteurService.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Deleted");
    }
}