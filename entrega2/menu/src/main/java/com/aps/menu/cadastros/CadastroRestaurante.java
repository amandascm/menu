package com.aps.menu.cadastros;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.aps.menu.entidades.Conta;
import com.aps.menu.entidades.Restaurante;

@Component
public class CadastroRestaurante {
    @Autowired
    private IRepositorioRestaurante repositorioRestaurante;

    public boolean existeRestaurante(Conta conta) {
        return repositorioRestaurante.existe(conta);
    }

    public Restaurante registrar(Restaurante restaurante) {
        return repositorioRestaurante.registrar(restaurante);
    }
}
