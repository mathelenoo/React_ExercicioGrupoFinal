package com.trabalhoreact.service;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.trabalhoreact.dto.LivroDTO;
import com.trabalhoreact.exception.TituloException;
import com.trabalhoreact.model.Livro;
import com.trabalhoreact.repository.LivroRepository;

import jakarta.transaction.Transactional;

@Service
public class LivroService {

	@Autowired
	private LivroRepository livroRepository;
	
	@Autowired
	private CapaLivroService capaLivroService;
	
	public LivroDTO addImageUrl(Livro livro) {
		URI uri = ServletUriComponentsBuilder
				.fromCurrentContextPath()
				.path("/livros/{id}/capa")
				.buildAndExpand(livro.getId())
				.toUri();
		
		LivroDTO livroDto = new LivroDTO();
		livroDto.setId(livro.getId());
		livroDto.setAutor(livro.getAutor());
		livroDto.setCategoria(livro.getCategoria());
		livroDto.setEditora(livro.getEditora());
		livroDto.setNumeroPaginas(livro.getNumeroPaginas());
		livroDto.setSinopse(livro.getSinopse());
		livroDto.setTitulo(livro.getTitulo());
		livroDto.setUrl(uri.toString());
		
		return livroDto;
	}
	
	public List<LivroDTO> findAll(){
		List<Livro> livros = livroRepository.findAll();
		
		List<LivroDTO> livrosDTO = new ArrayList<>();
		
		livros.forEach(c -> {
			livrosDTO.add(addImageUrl(c));
		});
		
		return livrosDTO;
	}
	
	public LivroDTO findById(Long id) throws NotFoundException {
		Optional<Livro> livroOpt = livroRepository.findById(id);
		if (livroOpt.isEmpty()) {
			throw new NotFoundException();
		}
		return addImageUrl(livroOpt.get());
	}
	
	@Transactional
	public LivroDTO insert(Livro livro, MultipartFile file) throws IOException {
		
		livro = livroRepository.save(livro);
		capaLivroService.insert(livro, file);
		return addImageUrl(livro);
	}
	
	@Transactional
	public LivroDTO change(Livro livro, MultipartFile file) throws IOException{
		
		livro = livroRepository.save(livro);
		capaLivroService.change(livro, file);
		
		return addImageUrl(livro);
	}
}
