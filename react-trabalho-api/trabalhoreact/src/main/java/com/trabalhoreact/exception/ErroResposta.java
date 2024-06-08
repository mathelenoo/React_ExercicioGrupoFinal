package com.trabalhoreact.exception;

import java.time.LocalDateTime;
import java.util.List;

public class ErroResposta {
	private Integer status;
	private String titulo;
	private LocalDateTime dataHora;
	private List<String> erro;

	public ErroResposta(Integer status, String titulo, LocalDateTime dataHora, List<String> erro) {
		super();
		this.status = status;
		this.titulo = titulo;
		this.dataHora = dataHora;
		this.erro = erro;
	}

	public Integer getStatus() {
		return status;
	}

	public String getTitulo() {
		return titulo;
	}

	public LocalDateTime getDataHora() {
		return dataHora;
	}

	public List<String> getErro() {
		return erro;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public void setDataHora(LocalDateTime dataHora) {
		this.dataHora = dataHora;
	}

	public void setErro(List<String> erro) {
		this.erro = erro;
	}

}
