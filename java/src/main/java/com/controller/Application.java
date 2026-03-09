package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import com.service.NoteService;

@SpringBootApplication
@ComponentScan(basePackages = {"com"})
@EntityScan(basePackages = {"com.entity"})
public class Application {

    @Autowired
    NoteService noteService;
    
    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public CommandLineRunner run() {
        return args -> {
            try {
                // double note = noteService.note_final_matiere(1, 1);
                // System.out.println("NOTE FINAL: "+note);
            } catch (Exception e) {
                throw e;
            }
        };
    }
}