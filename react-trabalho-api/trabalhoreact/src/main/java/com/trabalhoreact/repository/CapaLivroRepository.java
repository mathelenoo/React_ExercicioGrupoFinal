package com.trabalhoreact.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trabalhoreact.model.CapaLivro;
import com.trabalhoreact.model.Livro;

public interface CapaLivroRepository extends JpaRepository<CapaLivro, Long>{

	public Optional<CapaLivro> findByLivro(Livro livro);

}
