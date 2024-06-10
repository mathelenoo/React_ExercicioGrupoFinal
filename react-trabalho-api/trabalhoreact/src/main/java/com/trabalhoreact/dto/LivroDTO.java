package com.trabalhoreact.dto;

import com.trabalhoreact.model.Categoria;

public class LivroDTO {

	private Long id;
	
	private String titulo;
	
	private String sinopse;
	
	private Integer numeroPaginas;
	
	private Categoria categoria;
	
	private String autor;
	
	private String editora;
	
	private String url;

	public Long getId() {
		return id;
	}

	public String getTitulo() {
		return titulo;
	}

	public String getSinopse() {
		return sinopse;
	}

	public Integer getNumeroPaginas() {
		return numeroPaginas;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public String getAutor() {
		return autor;
	}

	public String getEditora() {
		return editora;
	}

	public String getUrl() {
		return url;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public void setSinopse(String sinopse) {
		this.sinopse = sinopse;
	}

	public void setNumeroPaginas(Integer numeroPaginas) {
		this.numeroPaginas = numeroPaginas;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

	public void setEditora(String editora) {
		this.editora = editora;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	
}
