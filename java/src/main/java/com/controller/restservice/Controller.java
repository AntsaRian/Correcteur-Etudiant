package com.controller.restservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.service.NoteService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // pour autoriser React
public class Controller {
    @Autowired
    NoteService noteService;

    @PostMapping("/note")
    public double get_note_by_matiere_etu(@RequestBody JsonNode data) {

        Integer id_etu = data.get("id_etudiant").asInt();
        Integer id_matiere = data.get("id_matiere").asInt();

        return noteService.note_final_matiere(id_etu, id_matiere);
    }
}