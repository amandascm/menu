package com.aps.menu.entidades;

import javax.persistence.Entity;

@Entity
public class Cliente extends Conta{
    private String nome;
    private String endereco; // MUDAR PARA CLASSE ENDERECO


    public Cliente(Long id, String email, String senha, String nome, String endereco) {
        super(id, email, senha);
        this.nome = nome;
        this.endereco = endereco;
    }

    public Cliente(Long id, String email, String senha) {
        super(id, email, senha);
    }

    public Cliente () {
        
    }
}
