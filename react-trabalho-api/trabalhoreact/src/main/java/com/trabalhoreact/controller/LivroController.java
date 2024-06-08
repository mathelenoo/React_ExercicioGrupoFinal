package com.trabalhoreact.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trabalhoreact.model.Livro;
import com.trabalhoreact.repository.LivroRepository;
import com.trabalhoreact.service.LivroService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/livros")
public class LivroController {

	@Autowired
	private LivroService livroService;
	
	@Autowired
	private LivroRepository livroRepository;
	
	@GetMapping
	public ResponseEntity<List<Livro>> listar(@PathVariable Long id) {
		return ResponseEntity.ok(livroService.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Livro> buscar(@PathVariable Long id) throws NotFoundException {
		return ResponseEntity.ok(livroService.findById(id));
	}
	
	@PostMapping
	public ResponseEntity<Livro> inserir(@Valid @RequestBody Livro livro) {
		livroService.insert(livro);
		return ResponseEntity.ok().body(livro);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Livro> alterar(@PathVariable Long id, @Valid @RequestBody Livro livro) {
		if (!livroRepository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		livro.setId(id);
		livroService.change(livro);
		return ResponseEntity.ok(livro);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletar(@PathVariable Long id) {
		if (!livroRepository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		livroRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
