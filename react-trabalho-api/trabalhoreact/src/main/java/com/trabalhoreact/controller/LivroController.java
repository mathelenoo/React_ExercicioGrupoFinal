package com.trabalhoreact.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.trabalhoreact.dto.LivroDTO;
import com.trabalhoreact.model.CapaLivro;
import com.trabalhoreact.model.Livro;
import com.trabalhoreact.repository.LivroRepository;
import com.trabalhoreact.service.CapaLivroService;
import com.trabalhoreact.service.LivroService;

@RestController
@RequestMapping("/livros")
public class LivroController {

	@Autowired
	private LivroService livroService;
	
	@Autowired
	private LivroRepository livroRepository;
	
	@Autowired
	private CapaLivroService capaLivroService;
	
	@GetMapping
	public ResponseEntity<List<LivroDTO>> listar() {
		return ResponseEntity.ok(livroService.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<LivroDTO> buscar(@PathVariable Long id) throws NotFoundException {
		return ResponseEntity.ok(livroService.findById(id));
	}
	
	@GetMapping("/{id}/capa")
	public ResponseEntity<byte[]> buscarFoto(@PathVariable Long id) {
		CapaLivro capa = capaLivroService.findByIdLivro(id);
		
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", capa.getTipo());
		headers.add("Content-length", String.valueOf(capa.getDados().length));
		
		return new ResponseEntity<>(capa.getDados(), headers, HttpStatus.OK);
	}
	
	@PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<Livro> inserir(@RequestPart("file") MultipartFile file, @RequestPart("livro") Livro livro) throws IOException {
		livroService.insert(livro, file);
		return ResponseEntity.ok().body(livro);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Livro> alterar(@PathVariable Long id, @RequestBody Livro livro) throws IOException {
		if (!livroRepository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		Optional<Livro> livroTemp = livroRepository.findById(id);
		if (livroTemp.isEmpty()){
			return ResponseEntity.notFound().build();
		}
		
		livro.setId(id);
		livro.setCapa(livroTemp.get().getCapa());
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
