package com.controller.restservice;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Client;
import com.service.ClientService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/clients")
    public List<Client> getAll() {
        return clientService.getAll();
    }

    @GetMapping("/clients/{id}")
    public ResponseEntity<Client> getById(@PathVariable Integer id) {
        Optional<Client> n = clientService.getById(id);
        return n.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/clients")
    public ResponseEntity<Integer> create(@RequestBody Client client) {
        Integer id = clientService.create(client);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/clients/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody Client client) {
        client.setId(id);
        boolean updated = clientService.update(client);
        if (!updated) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping("/clients/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        boolean deleted = clientService.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Deleted");
    }
}