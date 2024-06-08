package com.trabalhoreact.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.trabalhoreact.exception.TituloException;
import com.trabalhoreact.model.Livro;
import com.trabalhoreact.repository.LivroRepository;

import jakarta.transaction.Transactional;

@Service
public class LivroService {

	@Autowired
	private LivroRepository livroRepository;
	
	public List<Livro> findAll(){
		List<Livro> livros = livroRepository.findAll();
		
		return livros;
	}
	
	public Livro findById(Long id) throws NotFoundException {
		Optional<Livro> livroOpt = livroRepository.findById(id);
		if (livroOpt.isEmpty()) {
			throw new NotFoundException();
		}
		return livroOpt.get();
	}
	
	@Transactional
	public Livro insert(Livro livro) {
		Livro livroBd = livroRepository.findByTitulo(livro.getTitulo());
		if (livroBd != null) {
			throw new TituloException("Titulo já existente");
		}
		
		livro = livroRepository.save(livro);
		
		return livro;
	}
	
	@Transactional
	public Livro change(Livro livro){
		
		livro = livroRepository.save(livro);
		
		return livro;
	}
}
