package com.trabalhoreact.model;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "livro")
public class Livro {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "preencha o titulo do livro!")
	@Size(max = 100)
	@Column(nullable = false, length = 100)
	private String titulo;
	
	@Size(max = 300)
	@Column(nullable = false, length = 300)
	private String sinopse;
	
	@Column(name = "numero_paginas")
	private Integer numeroPaginas;
	
	@Enumerated(EnumType.ORDINAL)
	private Categoria categoria;
	
	@NotBlank(message = "Preencha o nome do Autor")
	@Size(max = 30)
	@Column(nullable = false, length = 30)
	private String autor;
	
	@NotBlank(message = "Preencha o nome da Editora")
	@Size(max = 30)
	@Column(nullable = false, length = 30)
	private String editora;
	
	@OneToOne(mappedBy = "livro", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private CapaLivro capa;

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
	
	public CapaLivro getCapa() {
		return capa;
	}

	public void setCapa(CapaLivro capa) {
		this.capa = capa;
	}

	@Override
	public int hashCode() {
		return Objects.hash(autor, categoria, editora, id, numeroPaginas, sinopse, titulo);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Livro other = (Livro) obj;
		return Objects.equals(autor, other.autor) && categoria == other.categoria
				&& Objects.equals(editora, other.editora) && Objects.equals(id, other.id)
				&& Objects.equals(numeroPaginas, other.numeroPaginas) && Objects.equals(sinopse, other.sinopse)
				&& Objects.equals(titulo, other.titulo);
	}
}
