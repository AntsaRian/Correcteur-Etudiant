package com.controller.restservice;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Parametre;
import com.service.ParametreService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ParametreController {

    @Autowired
    private ParametreService parametreService;

    // GET all
    @GetMapping("/parametres")
    public List<Parametre> getAll() {
        return parametreService.getAll();
    }

    // GET by id
    @GetMapping("/parametres/{id}")
    public ResponseEntity<Parametre> getById(@PathVariable Integer id) {
        Optional<Parametre> p = parametreService.getById(id);
        return p.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET by matiere
    @GetMapping("/parametres/matiere/{id_matiere}")
    public List<Parametre> getByMatiere(@PathVariable Integer id_matiere) {
        return parametreService.get_param_matiere(id_matiere);
    }

    // POST create
    @PostMapping("/parametres")
    public ResponseEntity<Integer> create(@RequestBody Parametre parametre) {
        // Map nested objects by id only (sent as { "id": X })
        Integer id = parametreService.create(parametre);
        return ResponseEntity.ok(id);
    }

    // PUT update
    @PutMapping("/parametres/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody Parametre parametre) {
        parametre.setId(id);
        boolean updated = parametreService.update(parametre);
        if (!updated) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Updated");
    }

    // DELETE
    @DeleteMapping("/parametres/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        boolean deleted = parametreService.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Deleted");
    }
}