package com.aps.menu.entidades;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Conta {    
    @Id
    protected Long id;
    protected String email;
    protected String senha;


    public Conta(Long id, String email, String senha) {
        this.setId(id);
        this.setEmail(email);
        this.setSenha(senha);
    }

    public Conta () {
        
    }

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }    

}
