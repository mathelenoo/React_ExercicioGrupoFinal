package com.trabalhoreact.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.trabalhoreact.model.Livro;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long>{

	Livro findByTitulo(String titulo);
}
