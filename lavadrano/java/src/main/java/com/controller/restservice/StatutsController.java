package com.controller.restservice;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Statuts;
import com.service.StatutsService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class StatutsController {

    @Autowired
    private StatutsService statutsService;

    @GetMapping("/statuts")
    public List<Statuts> getAll() {
        return statutsService.getAll();
    }

    @GetMapping("/statuts/{id}")
    public ResponseEntity<Statuts> getById(@PathVariable Integer id) {
        Optional<Statuts> n = statutsService.getById(id);
        return n.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/statuts")
    public ResponseEntity<Integer> create(@RequestBody Statuts statuts) {
        Integer id = statutsService.create(statuts);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/statuts/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody Statuts statuts) {
        statuts.setId(id);
        boolean updated = statutsService.update(statuts);
        if (!updated) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping("/statuts/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        boolean deleted = statutsService.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Deleted");
    }
}