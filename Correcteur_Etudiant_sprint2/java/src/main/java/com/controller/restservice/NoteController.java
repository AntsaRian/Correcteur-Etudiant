package com.controller.restservice;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Note;
import com.service.NoteService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping("/notes")
    public List<Note> getAll() {
        return noteService.getAll();
    }

    @GetMapping("/notes/{id}")
    public ResponseEntity<Note> getById(@PathVariable Integer id) {
        Optional<Note> n = noteService.getById(id);
        return n.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/notes/etudiant/{id}")
    public List<Note> getByEtudiant(@PathVariable Integer id) {
        return noteService.get_notes_by_id_etu(id);
    }

    @GetMapping("/notes/etudiant/{idetu}/matiere/{idmatiere}")
    public List<Note> getByEtudiantMatiere(
            @PathVariable Integer idetu,
            @PathVariable Integer idmatiere) {
        return noteService.get_notes_by_etu_matiere(idetu, idmatiere);
    }

    @PostMapping("/notes")
    public ResponseEntity<Integer> create(@RequestBody Note note) {
        Integer id = noteService.create(note);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/notes/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody Note note) {
        note.setId(id);
        boolean updated = noteService.update(note);
        if (!updated) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        boolean deleted = noteService.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Deleted");
    }
}