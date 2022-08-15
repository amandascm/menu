package com.aps.menu.entidades;

import javax.persistence.Entity;

@Entity
public class Restaurante extends Conta {
    private String nome;
    private String endereco; // MUDAR PARA CLASSE ENDERECO
    private String telefone;


    public Restaurante(Long id, String email, String senha, String nome, String endereco, String telefone) {
        super(id, email, senha);
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
    }

    public Restaurante(Long id, String email, String senha) {
        super(id, email, senha);
    }

    public Restaurante () {
        
    }

}
