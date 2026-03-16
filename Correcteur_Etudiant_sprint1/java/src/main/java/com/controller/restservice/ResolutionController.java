package com.controller.restservice;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Resolution;
import com.service.ResolutionService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ResolutionController {

    @Autowired
    private ResolutionService resolutionService;

    @GetMapping("/resolutions")
    public List<Resolution> getAll() {
        return resolutionService.getAll();
    }

    @GetMapping("/resolutions/{id}")
    public ResponseEntity<Resolution> getById(@PathVariable Integer id) {
        Optional<Resolution> r = resolutionService.getById(id);
        return r.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/resolutions")
    public ResponseEntity<Integer> create(@RequestBody Resolution resolution) {
        Integer id = resolutionService.create(resolution);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/resolutions/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody Resolution resolution) {
        resolution.setId(id);
        boolean updated = resolutionService.update(resolution);
        if (!updated) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping("/resolutions/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        boolean deleted = resolutionService.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Deleted");
    }
}