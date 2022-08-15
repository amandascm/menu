package com.aps.menu.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.aps.menu.cadastros.CadastroRestaurante;
import com.aps.menu.entidades.Restaurante;

@Component
public class ControladorCadastro {
    @Autowired
    private CadastroRestaurante cadastroRestaurante;
    
    public void registrar(Restaurante restaurante) {
        cadastroRestaurante.registrar(restaurante);
    }
    
    
}
