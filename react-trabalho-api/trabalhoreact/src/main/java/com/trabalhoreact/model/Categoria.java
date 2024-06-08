package com.trabalhoreact.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.trabalhoreact.exception.EnumValidationException;

public enum Categoria {
	FICCAO_CIENTIFICA(1, "Ficção Cientifica"), FANTASIA(2, "Fantasia"), ROMANCE(3, "Romance"),
	LITERATURA_CLASSICA(4, "Literatura Classica"), SUSPENSE(5, "Suspense"), HORROR(6, "Horror"), POESIA(7, "Poesia"),
	HISTORIA(8, "Historia"), BIOGRAFIA(9, "Biografia"), AUTOBIOGRAFIA(10, "Autobiografia");

	private Integer codigo;
	private String tipo;

	private Categoria(Integer codigo, String tipo) {
		this.codigo = codigo;
		this.tipo = tipo;
	}

	public Integer getCodigo() {
		return codigo;
	}

	public String getTipo() {
		return tipo;
	}

	@JsonCreator
	public static Categoria verifica(Integer value) throws EnumValidationException {
		for (Categoria c : values()) {
			if (value.equals(c.getCodigo())) {
				return c;
			}
		}
		throw new EnumValidationException("Categoria preenchida incorretamente");
	}
}
