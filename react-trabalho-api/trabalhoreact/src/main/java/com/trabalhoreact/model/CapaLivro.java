package com.trabalhoreact.model;

import java.sql.Types;

import org.hibernate.annotations.JdbcTypeCode;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;

@Entity
public class CapaLivro {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_capa")
	private Long id;
	
	@Lob
	@JdbcTypeCode(Types.BLOB)
	private byte[] dados;

	private String tipo;

	private String nome;

	@OneToOne
	@JoinColumn(name = "id_livro")
	@JsonBackReference
	private Livro livro;
	
	public CapaLivro() {
		
	}

	public CapaLivro(Long id, byte[] dados, String tipo, String nome, Livro livro) {
		super();
		this.id = id;
		this.dados = dados;
		this.tipo = tipo;
		this.nome = nome;
		this.livro = livro;
	}

	public Long getId() {
		return id;
	}

	public byte[] getDados() {
		return dados;
	}

	public String getTipo() {
		return tipo;
	}

	public String getNome() {
		return nome;
	}

	public Livro getLivro() {
		return livro;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setDados(byte[] dados) {
		this.dados = dados;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setLivro(Livro livro) {
		this.livro = livro;
	}
}
