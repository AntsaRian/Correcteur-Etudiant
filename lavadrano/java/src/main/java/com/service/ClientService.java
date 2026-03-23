package com.service;

import com.entity.Client;
import com.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public Integer create(Client m) {
        Client saved = clientRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!clientRepository.existsById(id)) return false;
        clientRepository.deleteById(id);
        return true;
    }

    public boolean update(Client m) {
        if (!clientRepository.existsById(m.getId())) return false;
        clientRepository.save(m);  // save = update
        return true;
    }

    public List<Client> getAll() {
        return clientRepository.findAll();
    }

    public Optional<Client> getById(Integer id) {
        return clientRepository.findById(id);
    }
}
