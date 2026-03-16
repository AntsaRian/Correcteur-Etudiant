package com.controller.restservice;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Matiere;
import com.service.MatiereService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class MatiereController {

    @Autowired
    private MatiereService matiereService;

    @GetMapping("/matieres")
    public List<Matiere> getAll() {
        return matiereService.getAll();
    }

    @GetMapping("/matieres/{id}")
    public ResponseEntity<Matiere> getById(@PathVariable Integer id) {
        Optional<Matiere> m = matiereService.getById(id);
        return m.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/matieres")
    public ResponseEntity<Integer> create(@RequestBody Matiere matiere) {
        Integer id = matiereService.create(matiere);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/matieres/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody Matiere matiere) {
        matiere.setId(id);
        boolean updated = matiereService.update(matiere);
        if (!updated) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping("/matieres/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        boolean deleted = matiereService.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Deleted");
    }
}