package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.entity.Note;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {
    @Query("SELECT n FROM Note n WHERE n.etudiant.id = :id")
    List<Note> get_notes_by_id_etu(@Param("id") Integer id);

    @Query("SELECT n FROM Note n WHERE n.etudiant.id = :idetu AND n.matiere.id = :idmatiere")
    List<Note> get_notes_by_etu_matiere(@Param("idetu") Integer idetu, @Param("idmatiere") Integer idmatiere);

    @Query("SELECT n.note FROM Note n WHERE n.matiere.id = :idmatiere AND n.etudiant.id = :idetu")
    List<Double> get_notes_matiere(@Param("idmatiere") Integer idmatiere, @Param("idetu") Integer idetu);
}
