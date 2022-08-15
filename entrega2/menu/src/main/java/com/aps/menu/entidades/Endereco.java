package com.aps.menu.entidades;

import javax.persistence.Entity;

@Entity
public class Endereco {
    private String rua, bairro;
    private int cep, numero;

    public Endereco(String rua, String bairro, int cep, int numero) {
        this.rua = rua;
        this.bairro = bairro;
        this.cep = cep;
        this.numero = numero;
    }

    public Endereco() {
        
    }
}
