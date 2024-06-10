package com.trabalhoreact.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.trabalhoreact.model.CapaLivro;
import com.trabalhoreact.model.Livro;
import com.trabalhoreact.repository.CapaLivroRepository;

import jakarta.transaction.Transactional;

@Service
public class CapaLivroService {

	@Autowired
	private CapaLivroRepository capaLivroRepository;
	
	public CapaLivro insert(Livro livro, MultipartFile file) throws IOException {
		CapaLivro capa = new CapaLivro();
		capa.setNome(file.getName());
		capa.setTipo(file.getContentType());
		capa.setDados(file.getBytes());
		capa.setLivro(livro);
		
		capa = capaLivroRepository.save(capa);
		
		return capa;
	}
	
	@Transactional
	public CapaLivro findByIdLivro(long id) {
		Livro livro = new Livro();
		livro.setId(id);
		Optional<CapaLivro> capaOpt = capaLivroRepository.findByLivro(livro);
		
		if(capaOpt.isEmpty()) {
			return null;
		}
		
		return capaOpt.get();
	}
	
	public CapaLivro change(Livro livro, MultipartFile file) throws IOException {
		Optional<CapaLivro> capaOpt = capaLivroRepository.findByLivro(livro);
		
		if(capaOpt.isEmpty()) {
			return null;
		}
		
		CapaLivro capa = new CapaLivro();
		capa.setId(capaOpt.get().getId());
		capa.setNome(file.getName());
		capa.setTipo(file.getContentType());
		capa.setDados(file.getBytes());
		capa.setLivro(livro);
		
		capa = capaLivroRepository.save(capa);
		
		return capa;
	}
}
